import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { WorkforceSolutionsView } from './components/WorkforceSolutionsView';
import { DomainOperationsView } from './components/DomainOperationsView';
import { GloballyUnscriptedHubView } from './components/GloballyUnscriptedHubView';
import { InterviewArticleView } from './components/InterviewArticleView';
import { AboutView, ContactView } from './components/AboutView';
import { AdminPortal } from './components/AdminPortal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { ContactModal } from './components/ContactModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { initialWebsiteContent, initialInterviews } from './data/initialData';
import { Interview, WebsiteContent } from './types';
import { apiUrl } from './config';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const [content, setContent] = useState<WebsiteContent>(initialWebsiteContent);
  const [interviews, setInterviews] = useState<Interview[]>(initialInterviews);

  // Modals state
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; youtubeId: string | null; title: string }>({
    isOpen: false,
    youtubeId: null,
    title: '',
  });

  // Fetch live database content
  const loadData = async () => {
    try {
      const [resContent, resInterviews] = await Promise.all([
        fetch(apiUrl('/api/content')).then(r => r.ok ? r.json() : null),
        fetch(apiUrl('/api/interviews')).then(r => r.ok ? r.json() : null),
      ]);

      if (resContent) setContent(resContent);
      if (resInterviews && Array.isArray(resInterviews) && resInterviews.length > 0) {
        setInterviews(resInterviews);
      }
    } catch (err) {
      console.warn('Using initial seed data due to network error:', err);
    }
  };

  useEffect(() => {
    loadData();

    // Parse initial URL path for routing
    const path = window.location.pathname;
    if (path.startsWith('/globally-unscripted/')) {
      const slug = path.replace('/globally-unscripted/', '');
      if (slug) {
        setCurrentView('interview-detail');
        setSelectedSlug(slug);
      }
    } else if (path === '/globally-unscripted') {
      setCurrentView('globally-unscripted');
    } else if (path === '/solutions/workforce') {
      setCurrentView('solutions-workforce');
    } else if (path === '/solutions/domain' || path === '/solutions/domain-operations') {
      setCurrentView('solutions-domain');
    } else if (path === '/about') {
      setCurrentView('about');
    } else if (path === '/contact') {
      setCurrentView('contact');
    } else if (path === '/admin') {
      setCurrentView('admin');
    }

    const handlePopState = () => {
      const newPath = window.location.pathname;
      if (newPath.startsWith('/globally-unscripted/')) {
        const slug = newPath.replace('/globally-unscripted/', '');
        setCurrentView('interview-detail');
        setSelectedSlug(slug);
      } else if (newPath === '/globally-unscripted') {
        setCurrentView('globally-unscripted');
        setSelectedSlug(null);
      } else if (newPath === '/solutions/workforce') {
        setCurrentView('solutions-workforce');
      } else if (newPath === '/solutions/domain') {
        setCurrentView('solutions-domain');
      } else if (newPath === '/about') {
        setCurrentView('about');
      } else if (newPath === '/contact') {
        setCurrentView('contact');
      } else if (newPath === '/admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('home');
        setSelectedSlug(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update browser URL and document title when navigating
  const navigateTo = (view: string, slug?: string) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let targetPath = '/';
    let docTitle = 'GG Global | Global Talent & Domain Operations';

    if (view === 'home') {
      targetPath = '/';
      setSelectedSlug(null);
    } else if (view === 'solutions-workforce') {
      targetPath = '/solutions/workforce';
      docTitle = 'Workforce Solutions & Contract Staffing | GG Global';
    } else if (view === 'solutions-domain') {
      targetPath = '/solutions/domain';
      docTitle = 'Domain Operations (P2P, AP, Finance) | GG Global';
    } else if (view === 'globally-unscripted') {
      targetPath = '/globally-unscripted';
      docTitle = 'Globally Unscripted | Leadership Conversations by GG Global';
      setSelectedSlug(null);
    } else if (view === 'interview-detail' && slug) {
      targetPath = `/globally-unscripted/${slug}`;
      setSelectedSlug(slug);
      const found = interviews.find(i => i.slug === slug);
      if (found) {
        docTitle = `${found.title} | Globally Unscripted`;
      }
    } else if (view === 'about') {
      targetPath = '/about';
      docTitle = 'About Us | GG Global';
    } else if (view === 'contact') {
      targetPath = '/contact';
      docTitle = 'Contact GG Global | Enterprise Solutions Desk';
    } else if (view === 'admin') {
      targetPath = '/admin';
      docTitle = 'Admin Portal & CMS | GG Global';
    }

    window.history.pushState({}, '', targetPath);
    document.title = docTitle;
  };

  const handleOpenVideo = (youtubeId: string, title: string) => {
    setVideoModal({
      isOpen: true,
      youtubeId,
      title,
    });
  };

  // Find active interview if on detail page
  const activeInterview = selectedSlug
    ? interviews.find(i => i.slug === selectedSlug) || interviews[0]
    : interviews[0];

  const latestPublishedInterview = interviews.find(i => i.isPublished) || interviews[0] || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#0C1017] text-slate-200 font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Ambient refined background glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/[0.06] rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-500/[0.06] rounded-full blur-[150px] pointer-events-none -z-10"></div>

      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        setCurrentView={navigateTo}
        openContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HomeView
            content={content}
            latestInterview={latestPublishedInterview}
            setCurrentView={navigateTo}
            openContactModal={() => setIsContactModalOpen(true)}
            openVideoModal={handleOpenVideo}
          />
        )}

        {currentView === 'solutions-workforce' && (
          <WorkforceSolutionsView
            content={content}
            openContactModal={() => setIsContactModalOpen(true)}
            setCurrentView={navigateTo}
          />
        )}

        {currentView === 'solutions-domain' && (
          <DomainOperationsView
            content={content}
            openContactModal={() => setIsContactModalOpen(true)}
            setCurrentView={navigateTo}
          />
        )}

        {currentView === 'globally-unscripted' && (
          <GloballyUnscriptedHubView
            interviews={interviews.filter(i => i.isPublished)}
            setCurrentView={navigateTo}
            openVideoModal={handleOpenVideo}
            openContactModal={() => setIsContactModalOpen(true)}
          />
        )}

        {currentView === 'interview-detail' && activeInterview && (
          <InterviewArticleView
            interview={activeInterview}
            allInterviews={interviews}
            setCurrentView={navigateTo}
            openContactModal={() => setIsContactModalOpen(true)}
          />
        )}

        {currentView === 'about' && (
          <AboutView
            content={content}
            setCurrentView={navigateTo}
            openContactModal={() => setIsContactModalOpen(true)}
          />
        )}

        {currentView === 'contact' && (
          <ContactView content={content} />
        )}

        {currentView === 'admin' && (
          <AdminPortal
            initialInterviews={interviews}
            initialContent={content}
            onRefreshData={loadData}
            onClose={() => navigateTo('home')}
            setCurrentView={navigateTo}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        content={content}
        setCurrentView={navigateTo}
      />

      {/* Global Interactive Chatbot Widget */}
      <ChatbotWidget
        isOpen={isChatbotOpen}
        onOpen={() => setIsChatbotOpen(true)}
        onClose={() => setIsChatbotOpen(false)}
        setCurrentView={navigateTo}
        latestInterviewSlug={latestPublishedInterview?.slug}
      />

      {/* Quick Consultation Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Executive Video Player Modal */}
      <VideoPlayerModal
        isOpen={videoModal.isOpen}
        youtubeId={videoModal.youtubeId}
        title={videoModal.title}
        onClose={() => setVideoModal({ isOpen: false, youtubeId: null, title: '' })}
      />

    </div>
  );
}
