import HorizontalScroll from '@oberon-amsterdam/horizontal';
import LoadingAnimation from 'components/LoadingAnimation';
import { PageProps } from "gatsby";
import * as React from 'react';
import { useEffect, useRef } from 'react';
import ScrollMagic from 'scrollmagic';
import styled, { createGlobalStyle } from 'styled-components';
import AppContext from 'util/AppContext';
import Home from './Home';
import GoogleTVM from './projects/GoogleTVM';
import Venga from './projects/Venga';
import { IS_DEVELOPMENT } from 'util/constants';
import { theme } from 'util/styles';
import Virion from './projects/Virion';
import Clog from './projects/Clog';
import DataTourism from './projects/dataTourism';
import Pansaari from './projects/Pansaari';
import TranscriptionHub from './projects/TranscriptionHub';
import useWindowSize from 'components/useWindowSize';
import Mobile from './Mobile';

const App: React.FC<PageProps> = props => {
  const [controller, setController] = React.useState(null as any);
  const [loading, setLoading] = React.useState(IS_DEVELOPMENT ? false : true);
  const [size, setSize] = React.useState(null);
  const sizeFromEffect = useWindowSize();

  // Initialize ScrolLMagic controller.
  React.useEffect(() => {
    setController(new ScrollMagic.Controller({
      vertical: false,
      container: 'html',
    }));
  }, []);

  // Create global React context so everyone can access the ScrollMagic controller.
  const context = {
    scrollMagicController: controller,
  };

  /* Naker.back background effect */
  React.useEffect(() => {
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

  React.useEffect(() => {
    setSize(sizeFromEffect);
  }, [sizeFromEffect]);

  if (size?.width < 550) {
    return (
      <>
        <GlobalStyle/>
        <Mobile/>
      </>
    );
  }

  return (
    <AppContext.Provider value={context}>
      <Container id='root'>
        {loading ? (
          <LoadingAnimation onFinishedLoading={() => setLoading(false)}/>
        ) : (
          <>
            <GlobalStyle/>
            <Home {...props}/>
            <Venga {...props}/>
            <GoogleTVM {...props}/>
            <Virion {...props}/>
            <Clog {...props}/>
            <DataTourism {...props}/>
            <Pansaari {...props}/>
            <TranscriptionHub {...props}/>
          </>
        )}
      </Container>
    </AppContext.Provider>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${theme.bgColor};
`;

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`
