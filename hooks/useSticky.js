import { useState, useEffect } from 'react';

const useSticky = fixRef => {
  const [isFix, setIsFix] = useState(false);

  useEffect(() => {
    const stickyPosY = fixRef.current.getBoundingClientRect().top;

    const onScroll = () => {
      if (window.scrollY > stickyPosY) {
        setIsFix(true);
        document.body.classList.add('scrolled');
      } else {
        setIsFix(false);
        document.body.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, true);

    return () => {
      window.removeEventListener('scroll', onScroll, true);
    };
  }, []);

  return {
    isFix,
  };
};
export default useSticky;
