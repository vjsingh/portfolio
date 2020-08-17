import { useEffect } from "react";

/* Naker.back background effect */
export default function useInteractiveBackground() {
  useEffect(() => {
    setTimeout(() => {
      (window as any).nakerback?.render({
        container: document.getElementById('home'),
        particle: {
          colorStart: [255, 106, 72, 1],
          colorEnd: [255, 106, 72, 1],
          sizeStart: 2,
          sizeEnd: 2,
          texture: 'https://res.cloudinary.com/naker-io/image/upload/v1566560053/star_01.png',
          direction1: {x:0,y:0,z:0},
          direction2: {x:-100,y:0,z:0},
          life: 5.3,
          power: .5,
          number: 50,
        },
        environment: {
          sensitivity: 0.29,
          colorStart: [255, 255, 255, 0],
          colorEnd: [255, 255, 255, 0],
          gradient: 'horizontal',
        },
        waterMark: false,
      });
    }, 1000);

    setTimeout(() => {
      if (!!document.getElementsByTagName('canvas')[0]) {
        document.getElementsByTagName('canvas')[0].style.visibility = 'hidden';
      }
    }, 1000);

  }, []);
}
