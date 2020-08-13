import { graphql, PageProps } from "gatsby";
import * as React from 'react';
import styled from 'styled-components';
import { H1 } from "util/textStyles";
import { theme } from 'util/styles';
import { HeaderText, MainContainer, SubheaderText, ViewProjectButton, ProjectPlaceholder } from './Project';
import ProjectContainer, { ProjectInnerProps } from "./ProjectContainer";
import ProjectImage from "./ProjectImage";
import { PAGE_COLORS, getPageIx, PAGES } from "util/pageUtil";

const name = 'virion';

const ProjectInner: React.FC<ProjectInnerProps> = props => {
  return (
    <>
      <ProjectImage name={name}/>
      <MainContainer>
        <HeaderText>Virion</HeaderText>
        <SubheaderText>Immersive online biology game.</SubheaderText>
        <ViewProjectButton hidden={props.active} onClick={props.onExpand}/>
      </MainContainer>
    </>
  );
}

const Virion: React.FC<PageProps> = props => {
  return (
    <ProjectContainer
      name={name}
      renderPage={(onExpand, active) => <ProjectInner onExpand={onExpand} active={active}/>}
      renderExpandedScreens={[
        () => <ProjectPlaceholder/>
      ]}
    />
  );
}
export default Virion;
