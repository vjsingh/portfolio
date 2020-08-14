import anime from 'animejs/lib/anime.es.js';
import { useEffect } from 'react';
import { keyframes } from 'styled-components';

export function useBounceInEffect(elRef) {
  useEffect(() => {
    if (!!elRef.current) {
      let el = elRef.current as any;

      el.style.visibility = 'visible';

      // Hide letters before they are animated in.
      el.style.overflow = 'hidden';

      // Display: inline-block is needed here so that transforms work on the span.
      el.innerHTML = el.textContent.replace(/\S/g, "<span class='letter' style='display:inline-block'>$&</span>");

      const uniqueId = '_' + new Date().getTime();
      el.classList.add(uniqueId);

      anime({
          targets: `.${uniqueId} .letter`,
          translateY: ['1.1em', 0],
          duration: 750,
          delay: (el, i) => 50 * i
      });
    }
  }, [elRef]);
}

export function useFlyInEffect(elRef, delay) {
  useEffect(() => {
    if (!!elRef.current) {
      let el = elRef.current as any;

      anime({
        targets: elRef.current,
        scale: [12,1],
        opacity: [0,1],
        easing: "easeOutCirc",
        duration: 700,
        delay,
      });
    }
  }, [elRef]);
}

export const fadeInAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
