/**
 * Helper to resolve static assets with the correct base URL.
 * Essential for GitHub Pages deployment where the app is served from a subdirectory.
 */
export const getAssetUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http') || path.startsWith('data:')) return path;

    const base = import.meta.env.BASE_URL;
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const cleanBase = base.endsWith('/') ? base : base + '/';

    return `${cleanBase}${cleanPath}`;
}
