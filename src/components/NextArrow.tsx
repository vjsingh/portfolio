import * as React from 'react';
import { scroller } from 'react-scroll';
import styled, { keyframes } from 'styled-components';
import withHover, { InjectHoverProps } from "components/withHover";
import { MyText, theme } from '../util/styles';
import Touchable from './Touchable';
import { scrollerArgs } from 'util/constants';
import { doScroll } from 'util/pageUtil';

interface InputProps extends InjectHoverProps {
  nextPage: string;
  isLeft?: boolean;
  isLarge?: boolean;
}

const NextArrow: React.FC<InputProps> = props => {
  return (
    <Container onClick={() => doScroll(props.nextPage)} hover={props.hover} isLeft={props.isLeft} isLarge={props.isLarge}>
      <Arrow hover={props.hover} isLeft={props.isLeft} isLarge={props.isLarge}>V</Arrow>
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
  width: ${p => p.isLarge ? '80px' : '60px'};
  height: 60px;
  border: 1px solid ${p => p.hover ? 'white' : theme.orange};
  border-radius: 40px;
  background-color: ${p => p.hover ? theme.orange : 'white'};
  animation-name: ${p => p.isLeft ? null : breatheAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  transition: background-color 1s, border 1s;
`;

const Arrow = styled(MyText)<any>`
  transform: rotate(${p => p.isLeft ? '90deg' : '270deg'});
  color: ${p => p.hover ? 'white' : theme.orange};
  font-size: ${p => p.isLarge ? '40px' : '34px'};
  font-weight: bold;
  transition: color 1s;
`;

export const NextArrowBottomRight = styled.div`
  position: absolute;
  right: 10vw;
  bottom: 10vh;
`;
