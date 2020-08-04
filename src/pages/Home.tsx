import React from "react"
import { PageProps } from "gatsby"
import styled from 'styled-components';
import { Text, PushRight, theme, PageContainer } from '../util/styles';
import Touchable from "../views/Touchable";

export default function Home(props: PageProps) {
  return (
    <Container>

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
        <BodyText>I’m a creative developer with experience from Silicon Valley to startup CEO. Let me help spin your next vision into digital reality.</BodyText>
      </HeroSection>

      <NextContainer>
        <NextArrow>V</NextArrow>
      </NextContainer>

      <BackgroundRight/>

    </Container>
  )
}

const Container = styled(PageContainer)`
  padding-left: 8.4vw;
`;

const Header = styled.div`
  padding: 5.8vh 5.8vw 0 0;
  display: flex;
`;

const HeaderText = styled(Text)`
  font-size: 24px;
  padding-right: 5.5vw;
`;


export const NameBrand = styled.div`
  margin-top: 17vh;
  flex-direction: column;
  display: flex;
`;

const NameBrandText = styled(Text)`
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

const SubheaderText = styled(Text)`
  font-size: 5.8vh;
  font-weight: bold;
  margin-bottom: 4.3vh;
`;

const BodyText = styled(Text)`
  width: 47vw;
  font-size: 2vh;
`;

const NextContainer = styled(Touchable)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10vw;
  bottom: 10vw;
  width: 80px;
  height: 80px;
  border: 1px solid ${theme.orange};
  border-radius: 40px;

`;

const NextArrow = styled(Text)`
  transform: rotate(270deg);
  color: ${theme.orange};
  font-size: 40px;
  font-weight: bold;
`;

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

/* Stripe
const BackgroundRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 200px;
  background-color: ${theme.orange};
  z-index: -1;
  transform: skew(-30deg);
  transform-origin:top;
`;
*/
