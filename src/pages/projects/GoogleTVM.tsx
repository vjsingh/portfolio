import useHorizontal from '@oberon-amsterdam/horizontal/hook';
import { graphql, PageProps, useStaticQuery } from "gatsby";
import Img from 'gatsby-image';
import * as React from 'react';
import styled from 'styled-components';
import { MyText, theme } from 'src/util/styles';
import Project, { ViewProjectButton, MainContainer, HeaderText, SubheaderText } from './Project';
import ProjectImage from './ProjectImage';

export default function GoogleTVM(props: PageProps) {
    return (
      <Project name='googleTVM' nextScreen='' bgColor={'#813A53'}>
        <ProjectImage name='googleTVM'/>
        <MainContainer>
          <HeaderText>Google Search UI</HeaderText>
          <SubheaderText>The next generation of immersive mobile experiences at Google.</SubheaderText>
          <ViewProjectButton/>
        </MainContainer>
      </Project>
    );
}
