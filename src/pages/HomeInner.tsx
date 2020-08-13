import { Link, PageProps } from "gatsby";
import React, { useContext, useRef } from "react";
import ScrollMagic from "scrollmagic";
import styled from 'styled-components';
import { useBounceInEffect, useFlyInEffect } from "util/animations";
import AppContext from "util/AppContext";
import { useHandleScroll } from "util/effects";
import { getNextPage } from "util/pageUtil";
import Arrow, { ArrowBottomRight } from "../components/Arrow";
import { BackgroundStripe, BACKGROUND_STRIPE_RIGHT, BACKGROUND_STRIPE_WIDTH, BACKGROUND_TRIANGLE_RIGHT, BACKGROUND_TRIANGLE_WIDTH } from '../util/styles';
import { HOME_SCENE_DURATION } from "./Home";
import { BodyRegular, H2 } from "util/textStyles";

const HomeInner: React.FC<PageProps> = props => {
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
      <HeroSection>
        <Subheader>
          <SubheaderText ref={subheaderEl}>Bringing digital visions to</SubheaderText>
          <SubheaderText>&nbsp;</SubheaderText>
          <LifeText ref={lifeTextEl}>{' life.'}</LifeText>
        </Subheader>
        <BodyText>
          {`I’m a creative developer with experience from Silicon Valley to startup CEO. `}
          <Link to='/about'>Currently available </Link>
          {`for freelance or consulting, let me help spin your next vision into digital reality.`}
        </BodyText>
      </HeroSection>

      <ArrowBottomRight>
        <Arrow isLarge nextPage={getNextPage('home')}/>
      </ArrowBottomRight>

      <BackgroundStripe right={rightPos} width={width}/>
    </>
  );
};

export default HomeInner;

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
