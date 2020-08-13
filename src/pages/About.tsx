import { PageProps } from "gatsby";
import React, { useContext, useRef } from "react";
import ScrollMagic from "scrollmagic";
import styled from 'styled-components';
import { useBounceInEffect, useFlyInEffect } from "util/animations";
import AppContext from "util/AppContext";
import { BACKGROUND_STRIPE_RIGHT, BACKGROUND_STRIPE_WIDTH, BACKGROUND_TRIANGLE_RIGHT, BACKGROUND_TRIANGLE_WIDTH, PageContainer } from '../util/styles';
import { GlobalStyle } from "./App";

export const HOME_SCENE_DURATION = 600;

const About: React.FC<PageProps> = props => {
  const context = useContext(AppContext);
  const [scrollPos, setScrollPos] = React.useState(0);
  const subheaderEl = useRef(null);
  const lifeTextEl = useRef(null);

  // Hide scrollbars and disable scroll while in About page.
  React.useEffect(() => {
    disableScroll();
    document.getElementById('root').style.overflow = 'hidden';
    return () => {
      enableScroll();
      document.getElementById('root').style.overflow = 'visible';
    };
  }, []);

  return (
    <>
      <Container name='about'>
        <InnerContainer>
        </InnerContainer>
      </Container>
    </>
  )
}

export default About;

const Container = styled(PageContainer)<any>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  background-color: white;
  overflow: hidden;
`;

const InnerContainer = styled.div`
  box-sizing: border-box;
  background-color: #cecece;
  height: 96vh;
  width: 96vw;
  margin: 2vh 2vw 2vh 2vw;
`;

// ********************** Prevent Scrolling ************************/
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  console.log('disabling');
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent as any, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent as any, preventDefault, wheelOpt as any); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt as any);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
