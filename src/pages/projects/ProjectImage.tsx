import { graphql, PageProps, useStaticQuery } from "gatsby";
import Img from 'gatsby-image';
import * as React from 'react';
import styled from 'styled-components';
import { MyText, theme } from '../../util/styles';
import Project from './Project';

interface InputProps {
  name: string;
}

const ProjectImage: React.FC<InputProps> = props => {
  const data = useStaticQuery(query);

  return (
    <ImageContainer>
      <Img
        fluid={data[props.name].childImageSharp.fluid}
        alt="Gatsby Docs are awesome"
        style={{flex: 1, maxHeight: '80vh', width: '30vw'}}
        imgStyle={{ objectFit: "contain" }}
      />
    </ImageContainer>
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
  }
`;

const ImageContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-left: 5vw;
`;
