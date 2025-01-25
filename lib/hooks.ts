'use client';

import { useEffect, useState } from 'react';

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    // Set the initial state
    setMatches(mediaQueryList.matches);
    // Add listener
    mediaQueryList.addEventListener('change', documentChangeHandler);

    // Cleanup listener on unmount
    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [query]);

  return matches;
};

const useYearAndMonth = () => {
  const yearAndMonth = new Date().toISOString().split('T')[0].slice(0, 7);
  return yearAndMonth;
};

export { useMediaQuery, useYearAndMonth };
