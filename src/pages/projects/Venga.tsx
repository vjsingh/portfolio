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
  console.log(props.active);
  return (
    <>
      <ProjectImage name='venga'/>
      <MainContainer>
        <HeaderText>VENGA CLIMB</HeaderText>
        <SubheaderText>A digital membership engagement platform for rock climbing gyms.</SubheaderText>
        <ViewProjectButton visible={!props.active} onClick={props.onExpand}/>
      </MainContainer>
    </>
  );
}

const VengaOverview: React.FC = props => {
  return (
    <div id='venga-overview'>
      <ProjectImage name='venga'/>
      <MainContainer>
        <HeaderText>VENGA CLIMB</HeaderText>
        <SubheaderText>A digital membership engagement platform for rock climbing gyms.</SubheaderText>
      </MainContainer>
    </div>
  );
}

const Venga: React.FC<PageProps> = props => {
  return (
    <ProjectContainer
      name='venga'
      renderPage={(onExpand, active) => <VengaInner onExpand={onExpand} active={active}/>}
      renderExpandedScreens={[
        () => <VengaOverview/>,
      ]}
    />
  );
}
export default Venga;
