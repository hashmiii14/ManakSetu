import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const RouterContext = createContext(null);

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [currentSearch, setCurrentSearch] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.search || '';
    }
    return '';
  });

  // Handle native browser back / forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setCurrentSearch(window.location.search || '');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to, options = {}) => {
    if (typeof window === 'undefined') return;

    let targetPath = to;
    let targetSearch = '';

    if (to.includes('?')) {
      const parts = to.split('?');
      targetPath = parts[0];
      targetSearch = '?' + parts[1];
    }

    if (!targetPath.startsWith('/')) {
      targetPath = '/' + targetPath;
    }

    const fullUrl = targetPath + targetSearch;

    if (options.replace) {
      window.history.replaceState(null, '', fullUrl);
    } else {
      window.history.pushState(null, '', fullUrl);
    }

    setCurrentPath(targetPath);
    setCurrentSearch(targetSearch);

    if (!options.preserveScroll) {
      window.scrollTo({ top: 0, behavior: options.smoothScroll ? 'smooth' : 'instant' });
    }
  }, []);

  // Parse URL search params
  const searchParams = React.useMemo(() => {
    if (typeof window === 'undefined' || !currentSearch) {
      return new URLSearchParams();
    }
    return new URLSearchParams(currentSearch);
  }, [currentSearch]);

  // Extract route params
  const routeParams = React.useMemo(() => {
    const params = {};
    // Matches /standards/:id
    const stdMatch = currentPath.match(/^\/standards\/([^/]+)$/);
    if (stdMatch && stdMatch[1] !== 'search') {
      params.standardId = decodeURIComponent(stdMatch[1]);
    }
    // Matches /services/:slug
    const srvMatch = currentPath.match(/^\/services\/([^/]+)$/);
    if (srvMatch) {
      params.serviceSlug = decodeURIComponent(srvMatch[1]);
    }
    return params;
  }, [currentPath]);

  const value = {
    path: currentPath,
    search: currentSearch,
    searchParams,
    params: routeParams,
    navigate
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export function Link({ to, children, className = '', onClick, ...props }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
