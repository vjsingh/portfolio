import useHorizontal from '@oberon-amsterdam/horizontal/hook';
import * as React from 'react';
import { scroller } from 'react-scroll';
import styled from 'styled-components';
import NextArrow, { NextArrowBottomRight } from '../../components/NextArrow';
import { MyText, PageContainer } from '../../util/styles';
import Touchable from 'components/Touchable';

interface InputProps {
  name: string;
  nextScreen: string;
  bgColor: string;
}

const Project: React.FC<InputProps> = props => {
    useHorizontal();

    const scrollToHome = () => {
      scroller.scrollTo('home', {
        duration: 900,
        delay: 0,
        smooth: true,
        horizontal: true,
      });
    };

    return (
      <Container name={props.name}>
        {props.children}
        <ProjectBackground color={props.bgColor}/>
        <HomeTextContainer onClick={scrollToHome}>
            <HomeText>Home</HomeText>
        </HomeTextContainer>
        <NameBrand>
          <Varun>VARUN</Varun>
          <Singh>SINGH</Singh>
        </NameBrand>
        <NextArrowBottomRight>
          <NextArrow nextScreen={props.nextScreen}/>
        </NextArrowBottomRight>
      </Container>
    );
};

export default Project;

export const ViewProjectButton = props => (
  <ViewProjectContainer>
    <ViewProjectText>VIEW PROJECT</ViewProjectText>
  </ViewProjectContainer>
);

const ViewProjectContainer = styled.div`
  display: flex;
  align-items: center;
  height: 7.5vh;
  border: 1px solid black;
  padding: 0 2vw;
`;

const ViewProjectText = styled(MyText)`
  font-size: 2vw;
  letter-spacing: .3em;
`;

export const MainContainer = styled.div`
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

export const HeaderText = styled(MyText)`
  font-size: 5.5vw;
  letter-spacing: 0.2em;
  text-align: right;
  margin-bottom: 4vh;
`;

export const SubheaderText = styled(MyText)`
  font-size: 2vw;
  letter-spacing: 0.2em;
  text-align: right;
  margin-bottom: 5vh;
`;

const Container = styled(PageContainer)<any>`
`;

export const ProjectBackground = styled.div`
  position: absolute;
  left: -30vw;
  top: 0;
  bottom: 0;
  width: 72vw;
  background-color: ${p => p.color};
  z-index: -1;
  transform: skew(10deg);
  transform-origin: 100% 0;
`;

const HomeTextContainer = styled(Touchable)`
  position: absolute;
  left: 5.7vw;
  top: 4.8vh;
  width: 100px;
  height: 50px;
`;

const HomeText = styled(MyText)`
  cursor: pointer;
  font-size: 24px;
`;

export const NameBrand = styled.div`
  position: absolute;
  left: 5.7vw;
  bottom: 4.8vh;
  display: flex;
  flex-direction: column;
`;

const NameBrandText = styled(MyText)`
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
