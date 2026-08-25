import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { initialInterviews, initialLeads, initialWebsiteContent } from "./src/data/initialData";
import { Interview, Lead, WebsiteContent } from "./src/types";

dotenv.config();

// Persistent file-backed storage directory
const DATA_DIR = path.join(process.cwd(), ".data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const INTERVIEWS_FILE = path.join(DATA_DIR, "interviews.json");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const CONTENT_FILE = path.join(DATA_DIR, "content.json");

function loadData<T>(file: string, fallback: T): T {
  try {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error loading data from ${file}:`, err);
  }
  return fallback;
}

function saveData<T>(file: string, data: T) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error saving data to ${file}:`, err);
  }
}

// In-memory runtime state initialized from disk or defaults
let interviews: Interview[] = loadData<Interview[]>(INTERVIEWS_FILE, initialInterviews);
let leads: Lead[] = loadData<Lead[]>(LEADS_FILE, initialLeads);
let websiteContent: WebsiteContent = loadData<WebsiteContent>(CONTENT_FILE, initialWebsiteContent);

// Gemini client helper (lazy)
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());

  // CORS: the frontend (Hostinger) and backend (Railway) are on different domains,
  // so the browser needs explicit permission to call this API cross-origin.
  // ALLOWED_ORIGINS can be a comma-separated list, set via env var; sensible defaults included.
  const allowedOrigins = (process.env.ALLOWED_ORIGINS || "https://ggglobal.in,https://www.ggglobal.in,http://localhost:3000,http://localhost:5173")
    .split(",")
    .map(o => o.trim());
  app.use((req: Request, res: Response, next: () => void) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);
    }
    next();
  });

  // Token storage for admin authentication.
  // Tokens are only ever added via a successful /api/admin/login — no hardcoded backdoor tokens.
  const validAdminTokens = new Set<string>();

  // Admin credentials MUST come from environment variables (.env, or your host's env settings).
  // The server refuses to start with default/missing credentials so a real login is always required.
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error(
      "FATAL: ADMIN_EMAIL and ADMIN_PASSWORD must be set as environment variables. " +
      "Add them to your .env file (see .env.example) or your host's environment settings. Server not started."
    );
    process.exit(1);
  }

  // Helper middleware for admin routes
  const requireAdmin = (req: Request, res: Response, next: () => void) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized. Admin authentication required." });
    }
    const token = authHeader.split(" ")[1];
    if (!validAdminTokens.has(token)) {
      return res.status(401).json({ error: "Invalid or expired session token." });
    }
    next();
  };

  // ==========================================
  // PUBLIC API: INTERVIEWS (GLOBALLY UNSCRIPTED)
  // ==========================================

  // Get all interviews (filter published for public, unless includeDrafts=true)
  app.get("/api/interviews", (req: Request, res: Response) => {
    const { category, search, includeDrafts } = req.query;
    let list = [...interviews];

    if (includeDrafts !== "true") {
      list = list.filter((item) => item.isPublished);
    }

    if (category && typeof category === "string" && category !== "All") {
      list = list.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }

    if (search && typeof search === "string") {
      const q = search.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.executiveName.toLowerCase().includes(q) ||
          item.company.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort by publication date descending
    list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    res.json(list);
  });

  // Get latest interview for homepage
  app.get("/api/interviews/latest", (req: Request, res: Response) => {
    const published = interviews
      .filter((i) => i.isPublished)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    if (published.length === 0) {
      return res.status(404).json({ error: "No published interviews available." });
    }

    res.json(published[0]);
  });

  // Get single interview by slug or ID
  app.get("/api/interviews/:slugOrId", (req: Request, res: Response) => {
    const { slugOrId } = req.params;
    const interview = interviews.find((i) => i.slug === slugOrId || i.id === slugOrId);

    if (!interview) {
      return res.status(404).json({ error: "Interview not found." });
    }

    // Increment view count
    interview.viewCount = (interview.viewCount || 0) + 1;
    saveData(INTERVIEWS_FILE, interviews);

    res.json(interview);
  });

  // ==========================================
  // ADMIN API: INTERVIEWS CRUD
  // ==========================================

  app.post("/api/interviews", requireAdmin, (req: Request, res: Response) => {
    const payload = req.body;
    if (!payload.title || !payload.executiveName || !payload.company) {
      return res.status(400).json({ error: "Title, executive name, and company are required." });
    }

    const slug =
      payload.slug ||
      `${payload.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${payload.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

    const newInterview: Interview = {
      id: `interview-${Date.now()}`,
      slug,
      title: payload.title,
      executiveName: payload.executiveName,
      executiveRole: payload.executiveRole || "Executive",
      company: payload.company,
      companyLogo: payload.companyLogo || "",
      executivePhoto: payload.executivePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
      publishedAt: payload.publishedAt || new Date().toISOString().split("T")[0],
      isPublished: payload.isPublished ?? true,
      summary: payload.summary || "",
      intro: payload.intro || "",
      keyHighlights: payload.keyHighlights || [],
      content: payload.content || "",
      youtubeUrl: payload.youtubeUrl || "",
      youtubeId: payload.youtubeId || "",
      linkedinUrl: payload.linkedinUrl || "",
      tags: payload.tags || ["Leadership"],
      category: payload.category || "Finance Leadership",
      readTime: payload.readTime || "6 min read",
      videoDuration: payload.videoDuration || "20 min watch",
      seoTitle: payload.seoTitle || `${payload.title} | Globally Unscripted`,
      seoDescription: payload.seoDescription || payload.summary || "",
      viewCount: 0,
    };

    interviews.unshift(newInterview);
    saveData(INTERVIEWS_FILE, interviews);
    res.status(201).json(newInterview);
  });

  app.put("/api/interviews/:id", requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    const index = interviews.findIndex((i) => i.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Interview not found." });
    }

    interviews[index] = {
      ...interviews[index],
      ...req.body,
      id, // Preserve immutable ID
    };

    saveData(INTERVIEWS_FILE, interviews);
    res.json(interviews[index]);
  });

  app.delete("/api/interviews/:id", requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    interviews = interviews.filter((i) => i.id !== id);
    saveData(INTERVIEWS_FILE, interviews);
    res.json({ success: true, message: "Interview deleted successfully." });
  });

  // ==========================================
  // LEADS & CRM API
  // ==========================================

  // Submit new lead (Public from Contact Form, AI Chatbot, Website CTAs)
  app.post("/api/leads", (req: Request, res: Response) => {
    const { name, company, email, phone, country, requirement, service, headcount, message, source, budget } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and work email are required." });
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name,
      company: company || "Undisclosed",
      email,
      phone: phone || "",
      country: country || "International",
      requirement: requirement || message || "Enterprise workforce / domain operations enquiry",
      service: service || "General Advisory",
      headcount: headcount || "Not specified",
      message: message || "",
      date: new Date().toISOString().split("T")[0],
      source: source || "Contact Form",
      status: "New",
      budget: budget || "",
    };

    leads.unshift(newLead);
    saveData(LEADS_FILE, leads);

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully. A GG Global director will be in touch within 24 hours.",
      lead: newLead,
    });
  });

  // Get leads (Admin)
  app.get("/api/leads", requireAdmin, (req: Request, res: Response) => {
    const { status, search } = req.query;
    let list = [...leads];

    if (status && typeof status === "string" && status !== "All") {
      list = list.filter((l) => l.status.toLowerCase() === status.toLowerCase());
    }

    if (search && typeof search === "string") {
      const q = search.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          l.requirement.toLowerCase().includes(q)
      );
    }

    res.json(list);
  });

  // Update lead status/notes (Admin - supports both PUT and PATCH)
  const updateLeadHandler = (req: Request, res: Response) => {
    const { id } = req.params;
    const index = leads.findIndex((l) => l.id === id);

    if (index === -1) {
      return res.status(404).json({ error: "Lead not found." });
    }

    leads[index] = {
      ...leads[index],
      ...req.body,
      id,
    };

    saveData(LEADS_FILE, leads);
    res.json(leads[index]);
  };

  app.put("/api/leads/:id", requireAdmin, updateLeadHandler);
  app.patch("/api/leads/:id", requireAdmin, updateLeadHandler);

  // Delete lead (Admin)
  app.delete("/api/leads/:id", requireAdmin, (req: Request, res: Response) => {
    const { id } = req.params;
    leads = leads.filter((l) => l.id !== id);
    saveData(LEADS_FILE, leads);
    res.json({ success: true });
  });

  // ==========================================
  // WEBSITE CONTENT MANAGEMENT API (CMS)
  // ==========================================

  app.get("/api/content", (req: Request, res: Response) => {
    res.json(websiteContent);
  });

  app.put("/api/content", requireAdmin, (req: Request, res: Response) => {
    websiteContent = {
      ...websiteContent,
      ...req.body,
    };
    saveData(CONTENT_FILE, websiteContent);
    res.json({ success: true, content: websiteContent });
  });

  // ==========================================
  // ADMIN AUTH & DASHBOARD STATS
  // ==========================================

  app.post("/api/admin/login", (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = `token-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      validAdminTokens.add(token);
      return res.json({
        success: true,
        token,
        user: { email, name: "GG Global Administrator", role: "Super Admin" },
      });
    }

    // Never echo back the expected credentials in the response.
    return res.status(401).json({ error: "Invalid credentials." });
  });

  // Optional: log out a token (clears it server-side so it can't be reused)
  app.post("/api/admin/logout", requireAdmin, (req: Request, res: Response) => {
    const token = req.headers.authorization!.split(" ")[1];
    validAdminTokens.delete(token);
    res.json({ success: true });
  });

  app.get("/api/admin/stats", requireAdmin, (req: Request, res: Response) => {
    const totalInterviews = interviews.length;
    const publishedInterviews = interviews.filter((i) => i.isPublished).length;
    const totalLeads = leads.length;
    const newLeads = leads.filter((l) => l.status === "New").length;
    const qualifiedLeads = leads.filter((l) => l.status === "Qualified" || l.status === "Proposal").length;
    const chatbotLeads = leads.filter((l) => l.source === "AI Chatbot").length;
    const totalViews = interviews.reduce((sum, i) => sum + (i.viewCount || 0), 0);

    const latestPublished = interviews
      .filter((i) => i.isPublished)
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())[0];

    res.json({
      totalInterviews,
      publishedInterviews,
      totalLeads,
      newLeads,
      qualifiedLeads,
      chatbotLeads,
      totalViews,
      latestInterview: latestPublished || null,
      recentLeads: leads.slice(0, 5),
    });
  });

  // ==========================================
  // AI CHATBOT (GG GLOBAL ASSISTANT)
  // ==========================================

  app.post("/api/chat", async (req: Request, res: Response) => {
    const { messages, userContext } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    const lastUserMessage = messages[messages.length - 1]?.text || "";

    // Build dynamic knowledge base string from live DB
    const publishedInterviews = interviews.filter((i) => i.isPublished);
    const latestInterview = publishedInterviews[0];

    const interviewsSummary = publishedInterviews
      .slice(0, 4)
      .map(
        (i) =>
          `• "${i.title}" with ${i.executiveName} (${i.executiveRole}, ${i.company}) [Category: ${i.category}]. Slug: ${i.slug}. Key quote: ${i.summary}`
      )
      .join("\n");

    const systemPrompt = `You are "GG Global AI" (also called "GG Assistant"), the senior executive AI advisory agent for GG Global.

ABOUT GG GLOBAL:
• Position: "Global Talent & Domain Operations"
• What we do: GG Global is a premier international B2B operating partner (NOT a generic recruitment agency, NOT a cheap BPO). We help international enterprises access specialized global talent and operate defined business functions.
• Two Main Core Business Areas:
  1. Workforce Solutions ("You need people"):
     - Contract Staffing: Qualified professionals working as an extension of client's existing team (individual contributors, niche leads, flexible 3-24 months).
     - Dedicated Teams: Curated squads/pods working exclusively on client backlogs under client leadership.
     - Global Talent Deployment: Compliant cross-border hiring and EOR across 18+ markets.
  2. Domain Operations ("You need a function managed"):
     - We build and manage specialized teams that operate defined business functions/processes with agreed KPIs, SLAs, error-containment targets, and executive reporting.
     - Procure-to-Pay (P2P): Requisition-to-disbursement, PO matching, payment runs, cycle time under 48 hours.
     - Accounts Payable (AP): Multi-entity invoice processing, 99.9% accuracy, discrepancy resolution, 1099/VAT compliance.
     - Finance Operations: Multi-currency reconciliations, GL maintenance, Day-3 close acceleration, SOX compliance.
     - Procurement Operations: Supplier onboarding, tail-spend governance, 12-18% cost containment.

ABOUT GLOBALLY UNSCRIPTED:
• Tagline: "Where Global Leaders Speak Unfiltered."
• Purpose: GG Global's flagship executive interview and leadership publication featuring candid conversations with CFOs and enterprise leaders.
• Latest Featured Interview: "${latestInterview?.title || "Inside the CFO Mind"}" featuring ${latestInterview?.executiveName || "Jeff Leong"}, ${latestInterview?.executiveRole || "CFO"} at ${latestInterview?.company || "Owl Cyber Defense"}.
• Other recent interviews:\n${interviewsSummary}

YOUR BEHAVIOR & TONE:
• Highly articulate, professional, consultative, and concise — like a senior partner at McKinsey or a seasoned CFO advisor.
• Always maintain a clean, confident B2B corporate tone.
• Clearly distinguish between GG Global's core commercial operations (Workforce Solutions & Domain Ops) and Globally Unscripted (the leadership interview platform).
• Proactively offer to connect the user with a GG Global practice leader or capture their requirements if they express hiring, finance operations, or P2P needs.

LEAD DETECTION / ENQUIRY CAPTURE:
If the user provides their contact details (e.g. email, name, company, or requirement) OR explicitly requests a meeting/quote/consultation, provide a warm executive response and include structured JSON metadata in your response within a tag like [LEAD_DATA: {"name": "...", "email": "...", "company": "...", "requirement": "...", "service": "..."}] so our system can auto-create the lead in the CRM.`;

    let replyText = "";
    let leadCaptured = false;

    // Helper for intelligent fallback response
    const generateFallbackResponse = (userMsg: string) => {
      const lower = userMsg.toLowerCase();
      let reply = "GG Global delivers specialized global talent and managed domain operations with institutional SLA precision. How can we assist your leadership team today?";
      let actionPills = ["How does P2P outsourcing work?", "I need contract finance specialists", "Tell me about Globally Unscripted", "Talk to a director"];

      if (lower.includes("p2p") || lower.includes("procure") || lower.includes("accounts payable") || lower.includes("domain") || lower.includes("ap")) {
        reply = "GG Global's Domain Operations practice builds and manages specialized teams for Procure-to-Pay (P2P), Accounts Payable, and Finance Operations. Unlike traditional outsourcing, we operate under strict contractual SLAs (such as <48 hr invoice cycle times and 99.8% match accuracy) with real-time KPI dashboards. Would you like to connect with our finance operations practice?";
        actionPills = ["Book a P2P Consultation", "What SLAs do you provide?", "Who is the latest CFO on Globally Unscripted?"];
      } else if (lower.includes("contract") || lower.includes("staffing") || lower.includes("people") || lower.includes("talent") || lower.includes("hire") || lower.includes("pod")) {
        reply = "Under our Workforce Solutions pillar, GG Global provides vetted contract staffing and dedicated engineering/finance pods. Specialists work directly within your team's reporting structure, while GG Global handles cross-border payroll, compliance, and onboarding within 7 to 14 days.";
        actionPills = ["Request Talent Profile", "How does dedicated staffing work?", "Submit an enquiry"];
      } else if (lower.includes("unscripted") || lower.includes("interview") || lower.includes("cfo") || lower.includes("jeff leong") || lower.includes("leader")) {
        reply = `Globally Unscripted is GG Global's executive thought leadership platform. Our latest featured conversation is with ${latestInterview?.executiveName || "Jeff Leong"}, ${latestInterview?.executiveRole || "CFO"} at ${latestInterview?.company || "Owl Cyber Defense"}, exploring capital efficiency, P2P optimization, and global talent orchestration.`;
        actionPills = ["Read Jeff Leong's Interview", "Explore All Interviews", "Nominate an Executive"];
      } else if (lower.includes("contact") || lower.includes("email") || lower.includes("meet") || lower.includes("call") || lower.includes("quote")) {
        reply = "Thank you for reaching out. A GG Global director will be pleased to discuss your requirements. Please feel free to share your email or click below to schedule a tailored executive consultation.";
        actionPills = ["Schedule a Consultation", "Explore Domain Operations", "View Leadership Pods"];
      }

      return { reply, actionPills };
    };

    try {
      const ai = getGeminiClient();

      if (ai) {
        // Multi-model fallback list in priority order
        const modelsToTry = [
          "gemini-3.7-flash",
          "gemini-2.5-flash",
          "gemini-flash-latest",
          "gemini-3.1-flash-lite",
        ];

        let generatedText: string | null = null;
        let lastError: any = null;

        for (const modelName of modelsToTry) {
          try {
            // Attempt with one retry for 503 or transient spikes
            for (let attempt = 0; attempt < 2; attempt++) {
              try {
                const chat = ai.chats.create({
                  model: modelName,
                  config: {
                    systemInstruction: systemPrompt,
                    temperature: 0.7,
                  },
                });

                const response = await chat.sendMessage({
                  message: `User message: "${lastUserMessage}"\nUser context: ${JSON.stringify(userContext || {})}`,
                });

                if (response?.text && response.text.trim().length > 0) {
                  generatedText = response.text;
                  break;
                }
              } catch (err: any) {
                lastError = err;
                const isTransient =
                  err?.status === "UNAVAILABLE" ||
                  err?.status === 503 ||
                  err?.message?.includes("503") ||
                  err?.message?.includes("high demand") ||
                  err?.message?.includes("429") ||
                  err?.message?.includes("RESOURCE_EXHAUSTED");

                if (isTransient && attempt === 0) {
                  // Brief backoff before retry
                  await new Promise((resolve) => setTimeout(resolve, 500));
                  continue;
                }
                break; // Break inner loop and try alternative model
              }
            }

            if (generatedText) {
              break;
            }
          } catch (modelErr) {
            lastError = modelErr;
          }
        }

        if (generatedText) {
          replyText = generatedText;
        } else {
          console.warn("All Gemini models encountered transient demand, engaging high-performance executive fallback engine:", lastError?.message || lastError);
          const fallback = generateFallbackResponse(lastUserMessage);
          replyText = fallback.reply;
        }
      } else {
        const fallback = generateFallbackResponse(lastUserMessage);
        replyText = fallback.reply;
      }
    } catch (err: any) {
      console.warn("Chat API handler exception, using safe fallback:", err?.message || err);
      const fallback = generateFallbackResponse(lastUserMessage);
      replyText = fallback.reply;
    }

    // Check if lead data is embedded in response or can be extracted from user text
    const leadMatch = replyText.match(/\[LEAD_DATA:\s*({.*?})\]/s);
    if (leadMatch) {
      try {
        const leadObj = JSON.parse(leadMatch[1]);
        if (leadObj.email || leadObj.name) {
          const autoLead: Lead = {
            id: `lead-chat-${Date.now()}`,
            name: leadObj.name || "Chatbot Visitor",
            company: leadObj.company || "Pending",
            email: leadObj.email || "chat-enquiry@client.com",
            country: leadObj.country || "International",
            requirement: leadObj.requirement || lastUserMessage,
            service: leadObj.service || "Domain Operations / Workforce Solutions",
            headcount: leadObj.headcount || "1-5",
            message: `Captured via GG Assistant. Dialogue: "${lastUserMessage}"`,
            date: new Date().toISOString().split("T")[0],
            source: "AI Chatbot",
            status: "New",
          };
          leads.unshift(autoLead);
          saveData(LEADS_FILE, leads);
          leadCaptured = true;
        }
      } catch (parseErr) {
        console.error("Error parsing auto lead data:", parseErr);
      }
      // Clean out the hidden metadata tag from the final user response
      replyText = replyText.replace(/\[LEAD_DATA:\s*{.*?}\]/gs, "").trim();
    } else {
      // Heuristic email/lead detection from user message
      const emailMatch = lastUserMessage.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
      if (emailMatch) {
        const autoLead: Lead = {
          id: `lead-chat-${Date.now()}`,
          name: userContext?.name || "Executive Visitor",
          company: userContext?.company || "Pending Verification",
          email: emailMatch[1],
          country: "International",
          requirement: lastUserMessage,
          service: "Executive Inquiry",
          headcount: "1-10",
          message: `Captured via GG Assistant. Message: "${lastUserMessage}"`,
          date: new Date().toISOString().split("T")[0],
          source: "AI Chatbot",
          status: "New",
        };
        leads.unshift(autoLead);
        saveData(LEADS_FILE, leads);
        leadCaptured = true;
      }
    }

    return res.json({
      reply: replyText,
      actionPills: [
        "Tell me about P2P outsourcing",
        "I need contract specialists",
        "Who is on Globally Unscripted?",
        "Schedule a consultation",
      ],
      leadCaptured,
    });
  });

  // ==========================================
  // DYNAMIC SITEMAP / SEO ENDPOINT
  // ==========================================

  app.get("/api/sitemap.xml", (req: Request, res: Response) => {
    const baseUrl = process.env.APP_URL || `http://${req.headers.host || "localhost:3000"}`;
    const published = interviews.filter((i) => i.isPublished);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/solutions/workforce</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/solutions/domain-operations</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/globally-unscripted</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

    published.forEach((item) => {
      xml += `  <url>
    <loc>${baseUrl}/globally-unscripted/${item.slug}</loc>
    <lastmod>${item.publishedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>\n`;
    });

    xml += `</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.send(xml);
  });

  // ==========================================
  // VITE DEV / PRODUCTION MIDDLEWARE
  // ==========================================

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GG Global Enterprise Server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal error starting server:", err);
  process.exit(1);
});