// API_BASE_URL points the frontend at the backend server.
//
// - If the frontend and backend are served from the SAME domain (e.g. both
//   running together via `npm run dev`, or both deployed to one Node host),
//   leave VITE_API_BASE_URL unset — it defaults to '' and calls stay relative
//   (e.g. fetch('/api/leads')), which just works.
//
// - If the frontend is deployed separately from the backend (e.g. static
//   files on Hostinger, backend running on Railway), set VITE_API_BASE_URL
//   to the backend's full URL before building, e.g.:
//     VITE_API_BASE_URL=https://gg-global-production.up.railway.app
//   Put that in a .env file at the project root before running `npm run build`.
export const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL || '';

export function apiUrl(path: string): string {
    return `${API_BASE_URL}${path}`;
}
