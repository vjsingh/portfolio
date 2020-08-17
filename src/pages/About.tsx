import { PageProps, graphql, useStaticQuery } from "gatsby";
import Img from 'gatsby-image';
import React, { useContext, useRef } from "react";
import ScrollMagic from "scrollmagic";
import styled from 'styled-components';
import { useBounceInEffect, useFlyInEffect, fadeInAnimation } from "util/animations";
import AppContext from "util/AppContext";
import { BACKGROUND_STRIPE_RIGHT, BACKGROUND_STRIPE_WIDTH, BACKGROUND_TRIANGLE_RIGHT, BACKGROUND_TRIANGLE_WIDTH, PageContainer, MyText, theme } from '../util/styles';
import { GlobalStyle } from "./App";
import { H1, H3, BodyRegular, scaleOnHover, LinkText } from "util/textStyles";
import Touchable from "components/Touchable";
import withHover from "components/withHover";

export const HOME_SCENE_DURATION = 600;
const RESUME_LINK = 'https://drive.google.com/file/d/1R5MhreefV2aTY-1Ndh1EsvcnOhFi_dZK/view?usp=sharing';
const LINKEDIN_LINK = 'https://www.linkedin.com/in/varun-singh-665ba5115/';
const MOUNTAINPROJECT_LINK = 'https://www.mountainproject.com/user/110592577/varun-singh';

const About: React.FC<PageProps> = props => {
  const context = useContext(AppContext);
  const [scrollPos, setScrollPos] = React.useState(0);
  const subheaderEl = useRef(null);
  const lifeTextEl = useRef(null);

  const data = useStaticQuery(query);

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
          <MainContainer>
            <MainLeft>
              <AboutMeText>About Me</AboutMeText>
              <HeaderText>Software engineer interested in Typescript and React.</HeaderText>
              <LabelContainer>
                <Column>
                  <Label>Mail</Label>
                  <LabelValue onClick={() => location.href = 'mailto:varun101@gmail.com'}>varun101[at]gmail.com</LabelValue>
                  <Column style={{marginTop: '8px'}}>
                    <Label>Resume</Label>
                    <LabelValue onClick={() => window.open(RESUME_LINK)}>View resume</LabelValue>
                  </Column>
                </Column>
                <Column>
                  <Label>Social</Label>
                  <LabelValue onClick={() => window.open(LINKEDIN_LINK)}>LinkedIn</LabelValue>
                  <LabelValue onClick={() => window.open('https://github.com/vjsingh')}>Github</LabelValue>
                  <LabelValue onClick={() => window.open(MOUNTAINPROJECT_LINK)}>Mountain Project</LabelValue>
                </Column>
              </LabelContainer>
            </MainLeft>
            <MainRight>
              <Img
                fluid={data['profile']?.childImageSharp.fluid}
                alt='Profile picture'
                style={{flex: 1, width: '25vw', maxWidth: '355px'}}
                imgStyle={{ objectFit: "contain" }}
              />
            </MainRight>
          </MainContainer>
          <FooterText>
            Design & development by Varun Singh. Fork me&nbsp;
            <LinkText onClick={() => window.open('https://github.com/vjsingh/portfolio')}>
              on Github
            </LinkText>
            .
          </FooterText>

        </InnerContainer>
      </Container>
    </>
  )
}

export default About;

export const query = graphql`
  query {
    profile: file(relativePath: { eq: "images/profile.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

export const ABOUT_PAGE_MARGIN = 20;

const Container = styled(PageContainer)<any>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  margin: ${ABOUT_PAGE_MARGIN}px;
  box-sizing: border-box;
  background-color: white;
  overflow: hidden;
`;

const InnerContainer = styled.div`
  display: flex;
  width: calc(100vw - ${ABOUT_PAGE_MARGIN * 2}px);
  height: calc(100vh - ${ABOUT_PAGE_MARGIN * 2}px);
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.bgColorAbout};
`;

const MainContainer = styled.div`
  width: 60vw;
  margin-top: 20vh;
  display: flex;
  animation-name: ${fadeInAnimation};
  animation-duration: 1s;
`;

const MainLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw;
`;

const MainRight = styled.div`
  margin-left: 5vw;
`;

const AboutMeText = styled(MyText)`
  font-size: 16px;
  color: white;
  letter-spacing: .1em;
  margin-bottom: 24px;
`;

const HeaderText = styled(MyText)`
  font-size: 30px;
  letter-spacing: .1em;
  margin-bottom: 75px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 66px;
`;

const LabelContainer = styled.div`
  display: flex;
`;

const Label = styled(MyText)`
  font-size: 15px;
  letter-spacing: .1em;
  color: #6D6D6D;
  margin-bottom: 8px;
`;

const LabelValueBase = props => (
  <Touchable onClick={props.onClick}>
    <LabelValueInner hover={props.hover}>
      {props.children}
    </LabelValueInner>
  </Touchable>
);
const LabelValue = withHover(LabelValueBase);

const LabelValueInner = styled(MyText)<any>`
  font-size: 15px;
  margin-bottom: 12px;
  font-weight: bold;
  letter-spacing: .1em;
  ${scaleOnHover}
`;

const FooterText = styled(MyText)`
  margin-top: auto;
  margin-bottom: 8vh;
  font-weight: 500;
  font-size: 12px;
  letter-spacing: .1em;
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

let disableScroll = () => {};
let enableScroll = () => {};
if (typeof window !== `undefined`) {
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
  disableScroll = () => {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent as any, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }

  // call this to Enable
  enableScroll = () => {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent as any, preventDefault, wheelOpt as any); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt as any);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  }
}
