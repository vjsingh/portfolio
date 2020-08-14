import { Link, PageProps } from "gatsby";
import React, { useContext, useEffect, useRef } from "react";
import styled, { keyframes } from 'styled-components';
import { NameBrandText, NavText } from "util/textStyles";
import { PageContainer, theme } from '../util/styles';
import HomeInner from "./HomeInner";
import About from "./About";
import AppContext from "util/AppContext";
import HorizontalScroll from "@oberon-amsterdam/horizontal";

export const HOME_SCENE_DURATION = 600;

const Home: React.FC<PageProps> = props => {
  const [activePage, setActivePageInternal] = React.useState('home'); // 'home' or 'about'.
  const context = useContext(AppContext);

  const horizontalController = useRef(null);

  // Turn vertical scrolling into horizontal scrolling.
  useEffect(() => {
    horizontalController.current = new HorizontalScroll({});

    return () => {
      if (horizontalController) horizontalController?.current?.destroy();
    };
  }, []);

  const setActivePage = page => {
    // We need to remove the HorizontalScroll plugin in About, otherwise
    // we aren't able to prevent scrolling on the About page.
    if (page === 'about') {
      horizontalController?.current?.destroy();
    } else if (page === 'home') {
      horizontalController?.current?.destroy();
      horizontalController.current = new HorizontalScroll({});
    }
    setActivePageInternal(page);
  };

  const goToAbout = () => setActivePage('about');


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

      {activePage === 'about' &&
        <About {...props}/>
      }

      <Header>
        <NavText active={activePage === 'home'} onClick={() => setActivePage('home')}>Work</NavText>
        <NavText active={activePage === 'about'} onClick={() => setActivePage('about')}>About</NavText>
      </Header>

    </>
  )
}

export default Home;

const MARGIN_LEFT = '8.4vw';

const fadeInAnimation = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled(PageContainer)<any>`
  padding-left: ${MARGIN_LEFT};
  background-color: ${theme.bgColorHome};
`;

const InnerContainer = styled.div`
  animation-name: ${fadeInAnimation};
  animation-duration: 2s;
  z-index: 1;
`;

// padding: 5.8vh 5.8vw 0 0;
const Header = styled.div`
  position: absolute;
  top: 5.8vh;
  left: ${MARGIN_LEFT};
  display: flex;
  z-index: 20;
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
