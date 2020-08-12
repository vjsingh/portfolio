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

const App: React.FC<PageProps> = props => {
  const [controller, setController] = React.useState(null as any);
  const [loading, setLoading] = React.useState(IS_DEVELOPMENT ? true : true);

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

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`
