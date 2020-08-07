import { PageProps } from "gatsby";
import * as React from 'react';
import styled from 'styled-components';
import { MyText, theme } from '../../util/styles';
import Project, { ViewProjectButton, MainContainer, SubheaderText, HeaderText, ProjectPageProps, PROJECT_EXPANDING_DURATION } from './Project';
import ProjectImage from "./ProjectImage";
import ScrollMagic from "scrollmagic";
import { useContext, useEffect } from "react";
import AppContext from "util/AppContext";
import ProjectContainer, { ProjectInnerProps } from "./ProjectContainer";

const VengaInner: React.FC<ProjectInnerProps> = props => {
  return (
    <>
      <ProjectImage name='venga'/>
      <MainContainer>
        <HeaderText>VENGA CLIMB</HeaderText>
        <SubheaderText>A digital membership engagement platform for rock climbing gyms.</SubheaderText>
        <ViewProjectButton onClick={props.onExpand}/>
      </MainContainer>
    </>
  );
}

const Venga: React.FC<PageProps> = props => {
  return (
    <ProjectContainer
      name='venga'
      nextScreen='googleTVM'
      renderPage={onExpand => <VengaInner onExpand={onExpand}/>}
    />
  );
}
export default Venga;

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background-color: blue;
  z-index: 10;
`;

const InnerContainer = styled.div`
  overflow-y: scroll;
  height: 200vh;
  &:after {
    content: '';
    display: block;
    height: 10000px;
  }
`;
