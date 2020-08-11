import { graphql, PageProps } from "gatsby";
import * as React from 'react';
import styled from 'styled-components';
import { H1 } from "util/textStyles";
import { theme } from '../../util/styles';
import { HeaderText, MainContainer, SubheaderText, ViewProjectButton } from './Project';
import ProjectContainer, { ProjectInnerProps } from "./ProjectContainer";
import ProjectImage from "./ProjectImage";
import { PAGE_COLORS, getPageIx, PAGES } from "util/pageUtil";

const name = PAGES[2];

const ProjectInner: React.FC<ProjectInnerProps> = props => {
  return (
    <>
      <ProjectImage name={name}/>
      <MainContainer>
        <HeaderText>Google Search UI</HeaderText>
        <SubheaderText>The next generation of immersive mobile experiences at Google.</SubheaderText>
        <ViewProjectButton hidden={props.active} onClick={props.onExpand}/>
      </MainContainer>
    </>
  );
}

const GoogleTVM: React.FC<PageProps> = props => {
  return (
    <ProjectContainer
      name='googleTVM'
      renderPage={(onExpand, active) => <ProjectInner onExpand={onExpand} active={active}/>}
      renderExpandedScreens={[
        () => <ProjectInner onExpand={() => {}} active={false}/>,
      ]}
    />
  );
}
export default GoogleTVM;
