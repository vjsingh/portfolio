import { graphql, PageProps, useStaticQuery } from "gatsby";
import Img from 'gatsby-image';
import * as React from 'react';
import styled from 'styled-components';
import { H1 } from "util/textStyles";
import { theme } from '../../util/styles';
import { HeaderText, MainContainer, SubheaderText, ViewProjectButton, makeProjectInner, ProjectPlaceholder } from './Project';
import ProjectContainer, { ProjectInnerProps } from "./ProjectContainer";
import ProjectImage from "./ProjectImage";
import Background from "./views/Background";
import { getPageColor } from "util/pageUtil";

const name = 'venga';
const headerText = 'VENGA CLIMB';
const subheaderText = 'Digital membership engagement platform for rock climbing gyms.';
const linkHref = 'http://www.vengaclimb.com';
const overviewText = `Venga Climb is a digital membership engagement platform for rock climbing gyms. My co-founder and I built the business to over 40 clients across the United States and Canada. We received a post-COVID investment at a $500k valuation, as well as an NC IDEA MICRO grant.\n\nDuring my time at Venga I learned about lean startup methodologies and product-market fit, as well as experience building out our iPhone, Android, and web apps. I leveraged React Native, React Native Web, and GraphQL + Prisma, to enable us to build all three of these platforms with only one developer.`;
const color = getPageColor(name);

const Venga: React.FC<PageProps> = props => {
  const ProjectInner = makeProjectInner(name, headerText, subheaderText, linkHref);

  return (
    <ProjectContainer
      name='venga'
      renderPage={(onExpand, active) => <ProjectInner onExpand={onExpand} active={active}/>}
      renderExpandedScreens={[
        () => <Background headerText='VENGA CLIMB' overviewText={overviewText} color={color}/>,
        () => <VengaTimeline/>,
        () => <ProjectPlaceholder/>,
      ]}
    />
  );
}
export default Venga;

const VengaTimeline: React.FC = props => {
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
  display: flex;
  flex: 1;
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
