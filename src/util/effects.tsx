import { useEffect } from "react";

export function useHandleScroll(setScrollPos) {
  const handleScroll = event => {
    setScrollPos(event.srcElement.documentElement.scrollLeft);
  };

  useEffect(() => {
    if (typeof window !== `undefined`) { // Required by Gatsby.
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);
}
