import { graphql, PageProps, useStaticQuery } from "gatsby";
import Img from 'gatsby-image';
import * as React from 'react';
import styled from 'styled-components';
import { H1 } from "util/textStyles";
import { theme } from '../../util/styles';
import { HeaderText, MainContainer, SubheaderText, ViewProjectButton } from './Project';
import ProjectContainer, { ProjectInnerProps } from "./ProjectContainer";
import ProjectImage from "./ProjectImage";

const VengaInner: React.FC<ProjectInnerProps> = props => {
  return (
    <>
      <ProjectImage name='venga'/>
      <MainContainer>
        <HeaderText>VENGA CLIMB</HeaderText>
        <SubheaderText>A digital membership engagement platform for rock climbing gyms.</SubheaderText>
        <ViewProjectButton hidden={props.active} onClick={props.onExpand}/>
      </MainContainer>
    </>
  );
}

const VengaOverview: React.FC = props => {
  const data = useStaticQuery(query);

  return (
    <OverviewContainer id='venga-overview'>
      <TimelineHeaderText>Timeline</TimelineHeaderText>
      <Img
        fluid={data['vengaTimeline']?.childImageSharp.fluid}
        alt="Gatsby Docs are awesome"
        style={{flex: 1, maxHeight: '70vh', width: '30vw'}}
        imgStyle={{ objectFit: "contain" }}
      />
    </OverviewContainer>
  );
}

const Venga: React.FC<PageProps> = props => {
  return (
    <ProjectContainer
      name='venga'
      bgColor={theme.orange}
      renderPage={(onExpand, active) => <VengaInner onExpand={onExpand} active={active}/>}
      renderExpandedScreens={[
        () => <VengaOverview/>,
      ]}
    />
  );
}
export default Venga;

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
