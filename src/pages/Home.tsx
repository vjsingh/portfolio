import { PageProps } from "gatsby";
import React, { useContext, useEffect, useRef } from "react";
import styled, { keyframes } from 'styled-components';
import Arrow, { ArrowBottomRight } from "../components/Arrow";
import { MyText, PageContainer, PushRight, theme, BackgroundStripe, BACKGROUND_STRIPE_RIGHT, BACKGROUND_STRIPE_WIDTH, BACKGROUND_TRIANGLE_RIGHT, BACKGROUND_TRIANGLE_WIDTH } from '../util/styles';
import { Link, H2, NavText, NameBrandText, BodyRegular } from "util/textStyles";
import ScrollMagic from "scrollmagic";
import AppContext from "util/AppContext";
import { PAGES, getNextPage } from "util/pageUtil";
import anime from 'animejs/lib/anime.es.js';
import { useBounceInEffect, useFlyInEffect } from "util/animations";
import { useHandleScroll } from "util/effects";

export const HOME_SCENE_DURATION = 600;

const Home: React.FC<PageProps> = props => {
  const context = useContext(AppContext);
  const [scrollPos, setScrollPos] = React.useState(0);
  const subheaderEl = useRef(null);
  const lifeTextEl = useRef(null);

  useHandleScroll(setScrollPos);

  React.useEffect(() => {
    if (context.scrollMagicController) {
      new ScrollMagic.Scene({
        // If no triggerElement set, defaults to start.
        duration: HOME_SCENE_DURATION,
      })
      .setPin('#home')
      .addTo(context.scrollMagicController);
    }
  }, [context?.scrollMagicController]);

  const progress = scrollPos / HOME_SCENE_DURATION;

  const rightPosStart = BACKGROUND_STRIPE_RIGHT;
  const rightPosEnd = BACKGROUND_TRIANGLE_RIGHT;
  const rightPos = rightPosStart + (progress * rightPosEnd);

  const widthStart = BACKGROUND_STRIPE_WIDTH;
  const widthEnd = BACKGROUND_TRIANGLE_WIDTH;
  const width = widthStart + (progress * widthEnd);

  useBounceInEffect(subheaderEl);
  useFlyInEffect(lifeTextEl, 1100);

  return (
    <>
      <Container name='home'>
        <InnerContainer>
          <Header>
            <NavText active>Work</NavText>
            <NavText>About</NavText>
          </Header>

          <NameBrand>
            <Varun>VARUN</Varun>
            <Singh>SINGH</Singh>
          </NameBrand>

          <HeroSection>
            <Subheader>
              <SubheaderText ref={subheaderEl}>Bringing digital visions to</SubheaderText>
              <SubheaderText>&nbsp;</SubheaderText>
              <LifeText ref={lifeTextEl}>{' life.'}</LifeText>
            </Subheader>
            <BodyText>
              {`I’m a creative developer with experience from Silicon Valley to startup CEO. `}
              <Link href='/contact'>Currently available </Link>
              {`for freelance or consulting, let me help spin your next vision into digital reality.`}
            </BodyText>
          </HeroSection>

          <ArrowBottomRight>
            <Arrow isLarge nextPage={getNextPage('home')}/>
          </ArrowBottomRight>
        </InnerContainer>

        <BackgroundStripe right={rightPos} width={width}/>
      </Container>
    </>
  )
}

export default Home;

const fadeInAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled(PageContainer)<any>`
  padding-left: 8.4vw;
`;

const InnerContainer = styled.div`
  animation-name: ${fadeInAnimation};
  animation-duration: 2s;
  z-index: 1;
`;

const Header = styled.div`
  padding: 5.8vh 5.8vw 0 0;
  display: flex;
`;


export const NameBrand = styled.div`
  margin-top: 17vh;
  flex-direction: column;
  display: flex;
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

const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.1vh;
`;

const Subheader = styled.div`
  margin-bottom: 4.3vh;
  display: flex;
`;

const SubheaderText = styled(H2)`
`;

const LifeText = styled(SubheaderText)`
`;

const BodyText = styled(BodyRegular)`
  width: 47vw;
  letter-spacing: 0.06em;
`;

/*
const BackgroundRight = styled.div`
  position: absolute;
  right: -400px;
  top: 0;
  bottom: 0;
  width: 400px;
  background-color: ${theme.orange};
  z-index: -1;
  transform: skew(-20deg);
  transform-origin: 100% 0;
`;
*/
