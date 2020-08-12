import * as React from 'react';
import { scroller } from 'react-scroll';
import styled, { keyframes } from 'styled-components';
import withHover, { InjectHoverProps } from "components/withHover";
import { MyText, theme } from '../util/styles';
import Touchable from './Touchable';
import { scrollerArgs } from 'util/constants';
import { doScroll } from 'util/pageUtil';
import { PROJECT_SCENE_DURATION } from 'pages/projects/Project';
import ArrowIcon from 'src/data/svgs/arrow.svg';

interface InputProps extends InjectHoverProps {
  nextPage?: string; // TODO: Should just pass this in using onScroll.
  orientation?: ORIENTATION;
  isLarge?: boolean;
  onScroll?: () => void;
}

export enum ORIENTATION { UP, RIGHT, DOWN, LEFT };

const Arrow: React.FC<InputProps> = props => {
  const orientation = props.orientation ?? ORIENTATION.RIGHT;
  let onScroll = props.onScroll;
  if (!onScroll) {
    if (!!props.nextPage) {
      onScroll = () => {
        doScroll(props.nextPage ?? '', props.orientation === ORIENTATION.LEFT ? -PROJECT_SCENE_DURATION : undefined);
      };
    }
  }

  const iconSize = props.isLarge ? 20 : 15;

  return (
    <Container
      onClick={onScroll}
      hover={props.hover}
      animate={orientation === ORIENTATION.RIGHT || orientation === ORIENTATION.DOWN}
      isLarge={props.isLarge}
    >
      <ArrowIconStyled width={iconSize} height={iconSize} hover={props.hover} orientation={props.orientation}/>
    </Container>
  );
};
export default withHover(Arrow);

const breatheAnimation = keyframes`
  from { transform: scale3d(1, 1, 1); }
  50% { transform: scale3d(1.30, 1.30, 1.30); }
  to { transform: scale3d(1, 1, 1); }
`;

const Container = styled(Touchable)<any>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${p => p.isLarge ? '60px' : '40px'};
  height: ${p => p.isLarge ? '60px' : '40px'};
  border: 1px solid ${p => p.hover ? 'white' : theme.orange};
  border-radius: 40px;
  background-color: ${p => p.hover ? theme.orange : 'white'};
  animation-name: ${p => p.animate ? breatheAnimation : null};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  transition: background-color 1s, border 1s;
  margin-left: 24px;
`;

const ArrowText = styled(MyText)<any>`
  color: ${p => p.hover ? 'white' : theme.orange};
  font-size: ${p => p.isLarge ? '40px' : '34px'};
  font-weight: bold;
  transition: color 1s, transform 1s;
`;

export const ArrowBottomRight = styled.div`
  position: absolute;
  right: 10vw;
  bottom: 10vh;
`;

const ArrowIconStyled = styled(ArrowIcon)<any>`
  fill: ${p => p.hover ? 'white' : 'black'};
  transform: rotate(${p =>
    p.orientation === ORIENTATION.LEFT ? '180deg' :
    p.orientation === ORIENTATION.UP ? '270deg' :
    p.orientation === ORIENTATION.DOWN ? '450deg' :
    '0deg'
  });
  transition: fill 1s, transform 1s;
`;
