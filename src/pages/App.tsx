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
            <TranscriptionHub {...props}/>
            <Pansaari {...props}/>
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
