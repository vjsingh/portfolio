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
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'

const App: React.FC<PageProps> = props => {
    useHorizontal();
    const [controller, setController] = React.useState(null as any);

  // Run on page load.
    React.useEffect(() => {
      setController(new ScrollMagic.Controller({
        vertical: false,
        container: 'html',
      }));
    }, []);

    const context = {
      scrollMagicController: controller,
    };

    return (
      <AppContext.Provider value={context}>
        <Container id='root'>
          <GlobalStyle/>
          <Home {...props}/>
          <Venga {...props}/>
          <GoogleTVM {...props}/>
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
