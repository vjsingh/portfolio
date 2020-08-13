import { graphql, PageProps, useStaticQuery } from "gatsby";
import Img from 'gatsby-image';
import * as React from 'react';
import styled from 'styled-components';
import { MyText, theme } from '../../util/styles';
import Project from './Project';

interface InputProps {
  name: string;
  isHorizontal?: boolean;
}

const ProjectImage: React.FC<InputProps> = props => {
  const data = useStaticQuery(query);

  return (
    <Container isHorizontal={props.isHorizontal}>
      <ImageContainer isHorizontal={props.isHorizontal}>
        <Img
          fluid={data[props.name]?.childImageSharp.fluid}
          alt={props.name}
          style={{flex: 1, maxHeight: '70vh', width: props.isHorizontal ? '50vw' : '30vw'}}
          imgStyle={{ objectFit: "contain" }}
        />
      </ImageContainer>
    </Container>
  );
}
export default ProjectImage

export const query = graphql`
  fragment projectImage on File {
    childImageSharp {
      fluid(quality: 90, maxWidth: 1600) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  query {
    venga: file(relativePath: { eq: "images/vengaLeague.png" }) {
      ...projectImage
    }
    googleTVM: file(relativePath: { eq: "images/googleTVM.png" }) {
      ...projectImage
    }
    virion: file(relativePath: { eq: "images/virion.png" }) {
      ...projectImage
    }
    clog: file(relativePath: { eq: "images/clog.png" }) {
      ...projectImage
    }
    dataTourism: file(relativePath: { eq: "images/dataTourism.png" }) {
      ...projectImage
    }
    pansaari: file(relativePath: { eq: "images/pansaari.png" }) {
      ...projectImage
    }
    transcriptionHub: file(relativePath: { eq: "images/transcriptionHub.png" }) {
      ...projectImage
    }
  }
`;

const Container = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${p => p.isHorizontal ? '70vw' : '50vw'};
  height: 100vh;
`;

const ImageContainer = styled.div<any>`
  position: absolute;
  top: 0;
  bottom: ${p => p.isHorizontal ? '10vh' : 0};
  display: flex;
  justify-content: center;
  align-items: center;
`;
