import * as React from 'react';
import { scroller } from 'react-scroll';
import styled, { keyframes } from 'styled-components';
import withHover, { InjectHoverProps } from "../components/withHover";
import { MyText, theme } from '../util/styles';
import Touchable from './Touchable';
import { scrollerArgs } from 'util/constants';

interface InputProps extends InjectHoverProps {
  nextScreen: string;
}

const NextArrow: React.FC<InputProps> = props => {
  const doScroll = () => {
    scroller.scrollTo(props.nextScreen, {
      ...scrollerArgs,
    });
  };

  return (
    <Container onClick={doScroll} hover={props.hover}>
      <Arrow hover={props.hover}>V</Arrow>
    </Container>
  );
};
export default withHover(NextArrow);

const breatheAnimation = keyframes`
  from { transform: scale3d(1, 1, 1); }
  50% { transform: scale3d(1.10, 1.10, 1.10); }
  to { transform: scale3d(1, 1, 1); }
`;

const Container = styled(Touchable)<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border: 1px solid ${p => p.hover ? 'white' : theme.orange};
  border-radius: 40px;
  background-color: ${p => p.hover ? theme.orange : 'white'};
  animation-name: ${breatheAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  transition: background-color 1s, border 1s;
`;

const Arrow = styled(MyText)<any>`
  transform: rotate(270deg);
  color: ${p => p.hover ? 'white' : theme.orange};
  font-size: 40px;
  font-weight: bold;
  transition: color 1s;
`;

export const NextArrowBottomRight = styled.div`
  position: absolute;
  right: 10vw;
  bottom: 10vh;
`;
