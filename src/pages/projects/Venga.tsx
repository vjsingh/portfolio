import { PageProps } from "gatsby";
import * as React from 'react';
import styled from 'styled-components';
import { MyText, theme } from '../../util/styles';
import Project, { ViewProjectButton, MainContainer, SubheaderText, HeaderText } from './Project';
import ProjectImage from "./ProjectImage";

export default function Venga(props: PageProps) {
    return (
      <Project name='venga' nextScreen='googleTVM' bgColor={theme.orange}>
        <ProjectImage name='venga'/>
        <MainContainer>
          <HeaderText>VENGA CLIMB</HeaderText>
          <SubheaderText>A digital membership engagement platform for rock climbing gyms.</SubheaderText>
          <ViewProjectButton/>
        </MainContainer>
      </Project>
    );
}
