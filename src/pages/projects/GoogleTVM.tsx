import { graphql, PageProps } from "gatsby";
import * as React from 'react';
import styled from 'styled-components';
import { H1 } from "util/textStyles";
import { theme } from '../../util/styles';
import { HeaderText, MainContainer, SubheaderText, ViewProjectButton, ProjectPlaceholder, makeProjectInner } from './Project';
import ProjectContainer, { ProjectInnerProps } from "./ProjectContainer";
import ProjectImage from "./ProjectImage";
import { PAGE_COLORS, getPageIx, PAGES } from "util/pageUtil";

const name = 'googleTVM';
const headerText = 'Google Search UI';
const subheaderText = 'Next generation Knowledge Exploration';

const GoogleTVM: React.FC<PageProps> = props => {
  const ProjectInner = makeProjectInner(name, headerText, subheaderText);

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
export default GoogleTVM;
