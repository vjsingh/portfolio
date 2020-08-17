import { Link, PageProps } from "gatsby";
import anime from 'animejs/lib/anime.es.js';
import React, { useContext, useEffect, useRef } from "react";
import styled, { keyframes } from 'styled-components';
import { NameBrandText, NavText } from "util/textStyles";
import { PageContainer, theme, BackgroundStripe, BACKGROUND_STRIPE_WIDTH, BACKGROUND_STRIPE_RIGHT, BACKGROUND_STRIPE_SKEW } from '../util/styles';
import HomeInner from "./HomeInner";
import About, { ABOUT_PAGE_MARGIN } from "./About";
import AppContext from "util/AppContext";
import HorizontalScroll from "@oberon-amsterdam/horizontal";
import { fadeInAnimation } from "util/animations";
import useInteractiveBackground from "components/useInteractiveBackground";

export const HOME_SCENE_DURATION = 600;

const Home: React.FC<PageProps> = props => {
  const [activePage, setActivePageInternal] = React.useState('home'); // 'home' or 'about'.
  const [isTransitioning, setIsTransitioning] = React.useState(false); // 'home' or 'about'.
  const stripeRef = useRef();
  const context = useContext(AppContext);

  const horizontalController = useRef(null);

  useInteractiveBackground();

  // Turn vertical scrolling into horizontal scrolling.
  useEffect(() => {
    horizontalController.current = new HorizontalScroll({});

    return () => {
      if (horizontalController) horizontalController?.current?.destroy();
    };
  }, []);

  // Animate stripe when going to about page.
  const doStripeAnimation = () => {
    if (!!stripeRef.current) {
      let el = stripeRef.current as any;

      anime({
        targets: el,
        scale: window.innerWidth / BACKGROUND_STRIPE_WIDTH,
        skew: [BACKGROUND_STRIPE_SKEW, 0],
        easing: "easeOutCirc",
        duration: PAGE_TRANSITION_DURATION / 2,
      });

      setTimeout(() => {
        let el = stripeRef.current as any;
        el.style.width = 'auto';
        anime({
          targets: el,
          backgroundColor: theme.bgColorAbout,
          easing: "easeOutCirc",
          top: [0, ABOUT_PAGE_MARGIN + 'px'],
          left: [0, ABOUT_PAGE_MARGIN + 'px'],
          right: [0, ABOUT_PAGE_MARGIN + 'px'],
          bottom: [0, ABOUT_PAGE_MARGIN + 'px'],
          scale: [1, 1],
          duration: PAGE_TRANSITION_DURATION / 2,
        });
      }, PAGE_TRANSITION_DURATION / 2);
    }
  };

  // Animate stripe when going back to home page.
  const doStripeAnimationReverse = () => {
    if (!!stripeRef.current) {
      let el = stripeRef.current as any;

      anime({
        targets: el,
        easing: "easeOutCirc",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        duration: PAGE_TRANSITION_DURATION / 2,

        complete: () => {
          let el = stripeRef.current as any;
          el.style.width = BACKGROUND_STRIPE_WIDTH + 'px';
          el.style.top = 0;
          el.style.bottom = 0;
          el.style.left = 'auto';
          el.style.right = BACKGROUND_STRIPE_RIGHT + 'px';
          anime({
            targets: el,
            scale: [window.innerWidth / BACKGROUND_STRIPE_WIDTH, 1],
            backgroundColor: theme.orange,
            skew: [0, BACKGROUND_STRIPE_SKEW],
            easing: "easeOutCirc",
            duration: PAGE_TRANSITION_DURATION / 2,
          });
        },
      });
    }
  };

  const setActivePage = page => {
    if (page === 'about') {
      // We need to remove the HorizontalScroll plugin in About, otherwise
      // we aren't able to prevent scrolling on the About page.
      horizontalController?.current?.destroy();
      setIsTransitioning(true);
      doStripeAnimation();

      setTimeout(() => {
        setIsTransitioning(false);
        setActivePageInternal(page);
      }, PAGE_TRANSITION_DURATION)

    } else if (page === 'home') {
      horizontalController?.current?.destroy();
      horizontalController.current = new HorizontalScroll({});

      setIsTransitioning(true);
      doStripeAnimationReverse();

      setTimeout(() => {
        setIsTransitioning(false);
        setActivePageInternal(page);
      }, PAGE_TRANSITION_DURATION)
    }

  };

  const goToAbout = () => setActivePage('about');

  const rightPos = BACKGROUND_STRIPE_RIGHT;
  const width = BACKGROUND_STRIPE_WIDTH;

  return (
    <>

      <Container name='home'>
        <InnerContainer>
          <NameBrand>
            <Varun>VARUN</Varun>
            <Singh>SINGH</Singh>
          </NameBrand>
          {activePage === 'home' && <HomeInner {...props} goToAbout={goToAbout}/> }
        </InnerContainer>
      </Container>

      {activePage === 'about' && !isTransitioning &&
        <About {...props}/>
      }

      <Header>
        <NavText
          active={(activePage === 'home' && !isTransitioning) || (activePage == 'about' && isTransitioning)}
          onClick={() => activePage === 'about' && !isTransitioning && setActivePage('home')}
        >
            Work
        </NavText>
        <NavText
          active={(activePage === 'about' && !isTransitioning) || (activePage == 'home' && isTransitioning)}
          onClick={() => activePage == 'home' && !isTransitioning && setActivePage('about')}
        >
          About
        </NavText>
      </Header>

      <div style={{display: isTransitioning ? 'block' : 'none'}}>
        <TransitionBackground/>
        <BackgroundStripe right={rightPos} width={width} ref={stripeRef} zindex={999}/>
      </div>
    </>
  )
}

export default Home;

const PAGE_TRANSITION_DURATION = 2000;

const MARGIN_LEFT = '8.4vw';

const Container = styled(PageContainer)<any>`
  padding-left: ${MARGIN_LEFT};
  background-color: ${theme.bgColorHome};
`;

const InnerContainer = styled.div`
  z-index: 1;
`;

// padding: 5.8vh 5.8vw 0 0;
const Header = styled.div`
  position: absolute;
  top: 5.8vh;
  left: ${MARGIN_LEFT};
  display: flex;
  z-index: 20;
  animation-name: ${fadeInAnimation};
  animation-duration: 2s;
`;


const NameBrand = styled.div`
  margin-top: 17vh;
  flex-direction: column;
  display: flex;
  animation-name: ${fadeInAnimation};
  animation-duration: 2s;
`;

export const Varun = styled(NameBrandText)`
`;

export const Singh = styled(NameBrandText)`
  margin-left: 2.8em;
  margin-top: -0.5em;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: black;
`;

const TransitionBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: white;
`;
