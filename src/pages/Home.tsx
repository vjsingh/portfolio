import { PageProps } from "gatsby";
import React, { useContext, useEffect } from "react";
import styled from 'styled-components';
import NextArrow, { NextArrowBottomRight } from "../components/NextArrow";
import { MyText, PageContainer, PushRight, theme } from '../util/styles';
import { Link } from "util/textStyles";
import ScrollMagic from "scrollmagic";
import AppContext from "util/AppContext";

const Home: React.FC<PageProps> = props => {
  const context = useContext(AppContext);
  const [scrollPos, setScrollPos] = React.useState(0);
  const [scene, setScene] = React.useState(null as any);

  const handleScroll = event => {
    setScrollPos(event.srcElement.documentElement.scrollLeft);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const SCENE_DURATION = 400;
  React.useEffect(() => {
    console.log('a');
    console.log(context.scrollMagicController);
    if (!scene && context.scrollMagicController) {
      setScene(new ScrollMagic.Scene({
        // If no triggerElement set, defaults to start.
        duration: SCENE_DURATION,
      })
      .setPin('#home')
      .addTo(context.scrollMagicController));
    }
  }, [context]);

  const progress = scrollPos / SCENE_DURATION;

  const rightPosStart = 0;
  const rightPosEnd = -400;
  const rightPos = rightPosStart + (progress * rightPosEnd);

  const widthStart = 200;
  const widthEnd = 400;
  const width = widthStart + (progress * widthEnd);

  return (
    <Container name='home'>

      <Header>
        <HeaderText>Work</HeaderText>
        <HeaderText>About</HeaderText>
        <PushRight>
          <HeaderText>Contact</HeaderText>
        </PushRight>
      </Header>

      <NameBrand>
        <Varun>VARUN</Varun>
        <Singh>SINGH</Singh>
      </NameBrand>

      <HeroSection>
        <SubheaderText>Bringing digital visions to life.</SubheaderText>
        <BodyText>
          {`I’m a creative developer with experience from Silicon Valley to startup CEO. `}
          <Link href='/contact'>Currently available </Link>
          {`for freelance or consulting, let me help spin your next vision into digital reality.`}
        </BodyText>
      </HeroSection>

      <NextArrowBottomRight>
        <NextArrow nextScreen='venga'/>
      </NextArrowBottomRight>

      <BackgroundStripe right={rightPos} width={width}/>

    </Container>
  )
}

export default Home;

const Container = styled(PageContainer)<any>`
  padding-left: 8.4vw;
`;

const Header = styled.div`
  padding: 5.8vh 5.8vw 0 0;
  display: flex;
`;

const HeaderText = styled(MyText)`
  font-size: 20px;
  padding-right: 5.5vw;
`;


export const NameBrand = styled.div`
  margin-top: 17vh;
  flex-direction: column;
  display: flex;
`;

const NameBrandText = styled(MyText)`
  font-size: 11vh;
  letter-spacing: 0.05em;
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

const SubheaderText = styled(MyText)`
  font-size: 5.8vh;
  font-weight: bold;
  margin-bottom: 4.3vh;
`;

const BodyText = styled(MyText)`
  width: 47vw;
  font-size: 2vh;
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

const BackgroundStripe = styled.div<any>`
  position: absolute;
  right: ${p => p.right + 'px'};
  top: 0;
  bottom: 0;
  width: ${p => p.width + 'px'};
  background-color: ${theme.orange};
  z-index: -1;
  transform: skew(-20deg);
  transform-origin: 100% 0;
`;
