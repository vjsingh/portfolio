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

const name = 'googleTVM';
const headerText = 'Google Search UI';
const subheaderText = 'Immersive mobile experiences at Google.';
const linkHref = 'https://www.google.com/search?q=coen+brothers+movies';
const overviewText = `I worked at Google on the Search UI team from 2013 to 2016. My team, Knowledge Exploration (KX), built new interactive experiences that enabled people to go beyond a “list of search results.” Leveraging Google’s Knowledge Graph, we enabled users to search horizontally across lists of entities. One of the goals of our team was to enable a more “exploratory” style of searching Google, as well as the ability to dig deeper into a given entity or topic.`;
const color = getPageColor(name);

const Video: React.FC = props => {
  return (
    <OverviewContainer id='venga-overview'>
      <iframe src="https://player.vimeo.com/video/450251330" width="300" height="600" allow="autoplay; fullscreen" frameBorder='0'/>
    </OverviewContainer>
  );
}


const GoogleTVM: React.FC<PageProps> = props => {
  const ProjectInner = makeProjectInner(name, headerText, subheaderText, linkHref);

  return (
    <ProjectContainer
      name={name}
      renderPage={(onExpand, active) => <ProjectInner onExpand={onExpand} active={active}/>}
      renderExpandedScreens={[
        () => <Background headerText='Google Search UI' overviewText={overviewText} color={color}/>,
        () => <Video/>,
        () => <ProjectPlaceholder/>
      ]}
    />
  );
}
export default GoogleTVM;

const OverviewContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 10vw;
  background-color: ${color};
`;
