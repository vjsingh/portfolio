import anime from 'animejs/lib/anime.es.js';
import { useEffect } from 'react';

export function useBounceInEffect(elRef) {
  useEffect(() => {
    if (!!elRef.current) {
      let el = elRef.current as any;

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