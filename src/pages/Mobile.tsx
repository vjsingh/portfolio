import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { theme, MyText } from "util/styles";
import { Varun, Singh } from "./projects/Project";

interface InputProps {
};

const Mobile: React.FC<InputProps> = props => {
  return (
    <Container>
      <InnerContainer>
        <NameBrand>
          <Varun>Varun</Varun>
          <SinghStyled>Singh</SinghStyled>
        </NameBrand>
        <MainText>This experience only available on a computer.</MainText>
      </InnerContainer>
    </Container>
  );
}

export default Mobile;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainText = styled(MyText)`
  text-align: center;
`;

const NameBrand = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
`;

const SinghStyled = styled(Singh)`
  margin-left: 2em;
  margin-top: -0.7em;
  -webkit-text-stroke-width: .025em;
`;
