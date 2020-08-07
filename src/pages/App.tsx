import useHorizontal from '@oberon-amsterdam/horizontal/hook';
import { PageProps } from "gatsby"
import * as React from 'react';
import { render } from 'react-dom';
import Home from './Home';
import styled from 'styled-components';
import Venga from './projects/Venga';
import { createGlobalStyle } from "styled-components"
import GoogleTVM from './projects/GoogleTVM';
import ScrollMagic from 'scrollmagic';
import AppContext from 'util/AppContext';
import LoadingAnimation from 'components/LoadingAnimation';
import { useRef, useEffect } from 'react';
import HorizontalScroll, { Options } from '@oberon-amsterdam/horizontal';
import ProjectContainer from './projects/ProjectContainer';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'

const App: React.FC<PageProps> = props => {
  const [controller, setController] = React.useState(null as any);
  const [loading, setLoading] = React.useState(false);

  // Turn vertical scrolling into horizontal scrolling.
  const horizontal = useRef<HorizontalScroll>();
  useEffect(() => {
    horizontal.current = new HorizontalScroll({});

    return () => {
      if (horizontal.current) horizontal.current.destroy();
    };
  }, []);

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

  // <GoogleTVM {...newProps}/>}
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
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`
