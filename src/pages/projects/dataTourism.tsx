import { graphql, PageProps } from "gatsby";
import * as React from 'react';
import styled from 'styled-components';
import { H1 } from "util/textStyles";
import { theme } from '../../util/styles';
import { HeaderText, MainContainer, SubheaderText, ViewProjectButton, ProjectPlaceholder, makeProjectInner } from './Project';
import ProjectContainer, { ProjectInnerProps } from "./ProjectContainer";
import ProjectImage from "./ProjectImage";
import { PAGE_COLORS, getPageIx, PAGES, getPageColor } from "util/pageUtil";
import Background from "./views/Background";

const name = 'dataTourism';
const headerText = 'Data Tourism';
const subheaderText = 'When you add data, what do you subtract?';
const linkHref = 'http://whatisdatatourism.com';
const overviewText = `For this project, I was responsible for the programming and implementation. I combined large amount of census data with google street view images to create an interactive experience.

"At the brink of a big data explosion, uncertainty surrounds how to utilize so much information. Despite temptation to extract as much as possible, we must stop and consider the implications. Rather than imposing data on anything and everything, let us be methodical and purposeful. Our piece invites you to reconsider the city as an inherently humanistic and nuanced space. Take a virtual tour of Providence and see what gets lost behind the numbers.

Data Tourism computationally reconstructs a tour through all 25 neighborhoods of Providence by stitching together Google Street View images of a Google Maps route between public parks in all neighborhoods. US Census data published in 2015 is programmatically retrieved for each frame and dynamically displayed throughout the tour. When you add data, what do you subtract?

Data Tourism was featured in the City + Data Exhibition at the Rhode Island School of Design hosted by Brown, RISD, & M.I.T STEAM."`;
const color = getPageColor(name);

const DataTourism: React.FC<PageProps> = props => {
  const ProjectInner = makeProjectInner(name, headerText, subheaderText, linkHref, true);

  return (
    <ProjectContainer
      name={name}
      renderPage={(onExpand, active) => <ProjectInner onExpand={onExpand} active={active}/>}
      renderExpandedScreens={[
        () => <Background headerText='Data Tourism' overviewText={overviewText} color={color}/>,
        () => <ProjectPlaceholder/>
      ]}
    />
  );
}

export default DataTourism;
