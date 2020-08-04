import useHorizontal from '@oberon-amsterdam/horizontal/hook';
import { Text, PushRight, theme, PageContainer } from '../../util/styles';
import { PageProps, graphql, useStaticQuery } from "gatsby"
import * as React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import Project, { ProjectBackground } from './Project';
import Img from 'gatsby-image';

export default function Venga(props: PageProps) {
    useHorizontal();

    const data = useStaticQuery(query);

    return (
      <Project>
        <ProjectBackground color={theme.orange}/>
        <HomeText>Home</HomeText>
        <NameBrand>
          <Varun>VARUN</Varun>
          <Singh>SINGH</Singh>
        </NameBrand>
        <ImageContainer>
          <Img
            fluid={data.vengaLeague.childImageSharp.fluid}
            alt="Gatsby Docs are awesome"
            style={{flex: 1, maxHeight: '80vh', width: '30vw'}}
            imgStyle={{ objectFit: "contain" }}
          />
        </ImageContainer>
        <MainContainer>
          <HeaderText>VENGA CLIMB</HeaderText>
          <SubheaderText>A digital membership engagement platform for rock climbing gyms.</SubheaderText>
          <ViewProjectContainer>
            <ViewProjectText>VIEW PROJECT</ViewProjectText>
          </ViewProjectContainer>
        </MainContainer>
      </Project>
    );
}

export const query = graphql`
  query {
    vengaLeague: file(relativePath: { eq: "images/venga_league.png" }) {
      childImageSharp {
        fluid(quality: 90, maxWidth: 1600) {
            ...GatsbyImageSharpFluid
          }
      }
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

const MainContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-right: 7.7vw;
  width: 50vw;
`;

const HeaderText = styled(Text)`
  font-size: 5.5vw;
  letter-spacing: 0.2em;
  text-align: right;
  margin-bottom: 4vh;
`;

const SubheaderText = styled(Text)`
  font-size: 2vw;
  letter-spacing: 0.2em;
  text-align: right;
  margin-bottom: 5vh;
`;

const ViewProjectContainer = styled.div`
  display: flex;
  align-items: center;
  height: 7.5vh;
  border: 1px solid black;
  padding: 0 2vw;
`;

const ViewProjectText = styled(Text)`
  font-size: 2vw;
  letter-spacing: .3em;
`;

const HomeText = styled(Text)`
  position: absolute;
  left: 5.7vw;
  top: 4.8vh;
  font-size: 24px;
`;

export const NameBrand = styled.div`
  position: absolute;
  left: 5.7vw;
  bottom: 4.8vh;
  display: flex;
  flex-direction: column;
`;

const NameBrandText = styled(Text)`
  font-size: 30px;
  letter-spacing: 0.05em;
`;

export const Varun = styled(NameBrandText)`
`;

export const Singh = styled(NameBrandText)`
  margin-left: 2.8em;
  margin-top: -0.5em;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: .03em;
  -webkit-text-stroke-color: black;
`;
