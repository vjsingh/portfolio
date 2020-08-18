import * as React from 'react';
import styled from 'styled-components';
import { MyText, theme } from 'util/styles';
import { PROJECT_MARGIN_LEFT } from '../Project';

interface InputProps {
  headerText: string;
  overviewText: string;
  color: string;
}

const Background: React.FC<InputProps> = props => {

  const overviewText = props.overviewText.split('\n').map((item, key) => {
    return <span key={key}>{item}<br/></span>
  });

  return (
    <Container>
      <Header>
        <HeaderText>{props.headerText}</HeaderText>
      </Header>
      <OuterRect>
        <InnerRect color={props.color}>
        </InnerRect>
        <TitleTextContainer>
          <TitleText>BACKGROUND</TitleText>
        </TitleTextContainer>
        <OverviewTextContainer>
          <OverviewText>{overviewText}</OverviewText>
        </OverviewTextContainer>
      </OuterRect>
      <NameBrandBottomLeft/>
    </Container>
  );
}

export default Background;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  padding-left: 7vw;
  padding-right: 7vw;
`;

const Header = styled.div`
  width: 100%;
  padding-top: 40px;
  height: 80px;
  border-bottom: 1px black solid;
  box-sizing: border-box;
  margin-bottom: 24px;
`;

const HeaderText = styled(MyText)`
  font-size: 18px;
  letter-spacing: .1em;
`;

const OuterRect = styled.div`
  position: relative;
  background-color: ${theme.bgColor};
  width: 95%;
  height: 70vh;
`;

const InnerRect = styled.div<any>`
  background-color: ${p => p.color};
  margin: 35px;
  width: 100%;
  height: 100%;
`;

const WhiteSection = styled.div`
  position: absolute;
  left: 0;
  background-color: white;
  padding-left: 35px;
`;

const TitleTextContainer = styled(WhiteSection)`
  top: 18%;
`;

const TitleText = styled(MyText)`
  font-size: 60px;
  letter-spacing: .3em;
`;

const OverviewTextContainer = styled(WhiteSection)`
  top: 36%;
  padding-top: 16px;
  padding-right: 50px;
  padding-bottom: 16px;
  width: 65vw;
  max-width: 1000px;
`;

const OverviewText = styled(MyText)`
  font-size: 18px;
  letter-spacing: .03em;
  line-height: 1.5;
`;

const NameBrandBottomLeft = () => (
  <NameBrand>
    <Varun>VARUN</Varun>
    <Singh>SINGH</Singh>
  </NameBrand>
);

export const NameBrand = styled.div`
  position: absolute;
  left: ${PROJECT_MARGIN_LEFT}vw;
  bottom: 4.8vh;
  display: flex;
  flex-direction: column;
`;

const NameBrandText = styled(MyText)`
  font-size: 20px;
  letter-spacing: 0.05em;
`;

export const Varun = styled(NameBrandText)`
`;

export const Singh = styled(NameBrandText)`
  margin-left: 2.8em;
  margin-top: -0.75em;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: .03em;
  -webkit-text-stroke-color: black;
`;
