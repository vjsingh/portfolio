import useHorizontal from '@oberon-amsterdam/horizontal/hook';
import { PageProps } from "gatsby"
import * as React from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { PageContainer } from '../../util/styles';

interface InputProps {
}

const Project: React.FC<InputProps> = props => {
    useHorizontal();

    return (
      <Container>
        {props.children}
      </Container>
    );
};

export default Project;

const Container = styled(PageContainer)`
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
