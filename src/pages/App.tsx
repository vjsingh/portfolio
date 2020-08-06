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
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators'

export default function App(props: PageProps) {
    useHorizontal();
    window.setTimeout(() => {
      let controller = new ScrollMagic.Controller({
        vertical: false,
        container: 'html',
      });

      var scene = new ScrollMagic.Scene({
        // Defaults to starting position.
        duration: 200
      })
      .setPin('#home')
      .addTo(controller);

      var scene2 = (new ScrollMagic.Scene({
        triggerElement: '#venga',
        duration: 200,
        triggerHook: 'onLeave', // Start pinning when the view is fully on screen (or 'about to leave')
      }) as any)
      .setPin('#venga')
      .addTo(controller);

    }, 0);

    return (
      <Container id='root'>
        <GlobalStyle/>
        <Home {...props}/>
        <Venga {...props}/>
        <GoogleTVM {...props}/>
      </Container>
    );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`
