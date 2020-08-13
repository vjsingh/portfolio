import { graphql, PageProps, useStaticQuery } from "gatsby";
import Img from 'gatsby-image';
import * as React from 'react';
import styled from 'styled-components';
import { H1 } from "util/textStyles";
import { theme } from '../../util/styles';
import { HeaderText, MainContainer, SubheaderText, ViewProjectButton, makeProjectInner } from './Project';
import ProjectContainer, { ProjectInnerProps } from "./ProjectContainer";
import ProjectImage from "./ProjectImage";

const name = 'venga';
const headerText = 'VENGA CLIMB';
const subheaderText = 'Digital membership engagement platform for rock climbing gyms';

const Venga: React.FC<PageProps> = props => {
  const ProjectInner = makeProjectInner(name, headerText, subheaderText);

  return (
    <ProjectContainer
      name='venga'
      renderPage={(onExpand, active) => <ProjectInner onExpand={onExpand} active={active}/>}
      renderExpandedScreens={[
        () => <VengaOverview/>,
        () => <VengaOverview/>,
      ]}
    />
  );
}
export default Venga;

const VengaOverview: React.FC = props => {
  const data = useStaticQuery(query);

  return (
    <OverviewContainer id='venga-overview'>
      <TimelineHeaderText>Timeline</TimelineHeaderText>
      <Img
        fluid={data['vengaTimeline']?.childImageSharp.fluid}
        alt="Venga Timeline"
        style={{flex: 1, maxHeight: '70vh', width: '30vw'}}
        imgStyle={{ objectFit: "contain" }}
      />
    </OverviewContainer>
  );
}

const OverviewContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10vw;
  background-color: ${theme.purple};
`;

const TimelineHeaderText = styled(H1)`
  position: absolute;
  top: 10vh;
  color: white;
`;

export const query = graphql`
  query {
    vengaTimeline: file(relativePath: { eq: "images/vengaTimeline.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1600) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
