import { useEffect } from 'react';

export function MatomoTracker() {
  useEffect(() => {
    // Matomo Tag Manager
    const script = document.createElement('script');
    script.innerHTML = `
      var _mtm = window._mtm = window._mtm || [];
      _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
      (function() {
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src='https://cdn.matomo.cloud/enamelclay85219611figmasite.matomo.cloud/container_ufSz9XJn.js'; s.parentNode.insertBefore(g,s);
      })();
    `;
    
    // Add script to document head
    document.head.appendChild(script);

    // For SPA navigation tracking, we need to listen for route changes
    // This will trigger the History Change trigger you configured in Matomo Tag Manager
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    const trackPageView = () => {
      if (window._mtm) {
        window._mtm.push({
          'event': 'mtm.PageView',
          'mtm.customTitle': document.title,
          'mtm.customUrl': window.location.href
        });
      }
    };

    // Override pushState and replaceState to track navigation
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      setTimeout(trackPageView, 0);
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      setTimeout(trackPageView, 0);
    };

    // Listen for popstate events (back/forward navigation)
    window.addEventListener('popstate', trackPageView);

    // Cleanup function
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      // Restore original methods
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
      window.removeEventListener('popstate', trackPageView);
    };
  }, []);

  return null; // This component doesn't render anything
}

// Extend the Window interface to include _mtm
declare global {
  interface Window {
    _mtm: any[];
  }
}