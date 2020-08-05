import useHorizontal from '@oberon-amsterdam/horizontal/hook';
import { PageProps } from "gatsby"
import * as React from 'react';
import { render } from 'react-dom';
import Home from './Home';
import styled from 'styled-components';
import Venga from './projects/Venga';
import { createGlobalStyle } from "styled-components"
import GoogleTVM from './projects/GoogleTVM';

export default function App(props: PageProps) {
    useHorizontal();

    return (
      <Container>
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
