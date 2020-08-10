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

const VengaBackground: React.FC = props => {
  return (
    <>
      <ProjectImage name='venga'/>
      <MainContainer>
        <HeaderText>VENGA CLIMB</HeaderText>
        <SubheaderText>A digital membership engagement platform for rock climbing gyms.</SubheaderText>
      </MainContainer>
    </>
  );
}

const Venga: React.FC<PageProps> = props => {
  return (
    <ProjectContainer
      name='venga'
      renderPage={onExpand => <VengaInner onExpand={onExpand}/>}
      renderExpandedScreens={[
        () => <VengaInner onExpand={() => {}}/>,
      ]}
    />
  );
}
export default Venga;
