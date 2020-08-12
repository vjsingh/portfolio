import * as React from 'react';
import { scroller } from 'react-scroll';
import styled, { keyframes, css } from 'styled-components';
import withHover, { InjectHoverProps } from "components/withHover";
import { MyText, theme } from '../util/styles';
import Touchable from './Touchable';
import { scrollerArgs } from 'util/constants';
import { doScroll } from 'util/pageUtil';
import { PROJECT_SCENE_DURATION, PROJECT_MARGIN_RIGHT } from 'pages/projects/Project';
import ArrowIcon from 'src/data/svgs/arrow.svg';
import ArrowDoubleIcon from 'src/data/svgs/arrowDouble.svg';
import xIcon from 'src/data/svgs/x.svg';

interface InputProps extends InjectHoverProps {
  orientation?: ORIENTATION;
  isLarge?: boolean;
  isDouble?: boolean;
  isX?: boolean;

  // Pass in either an onClick handler directly, or the nextPage for the default
  // interaction, which is to scroll to that page.
  onClick?: () => void;
  nextPage?: string;
}

export enum ORIENTATION { UP, RIGHT, DOWN, LEFT };

const Arrow: React.FC<InputProps> = props => {
  const orientation = props.orientation ?? ORIENTATION.RIGHT;
  let onClick = props.onClick;
  if (!onClick) {
    if (!!props.nextPage) {
      onClick = () => {
        doScroll(props.nextPage ?? '', props.orientation === ORIENTATION.LEFT ? -PROJECT_SCENE_DURATION : undefined);
      };
    }
  }

  const iconSize = props.isLarge || props.isDouble ? 20 : 15;

  return (
    <Container
      onClick={onClick}
      hover={props.hover}
      animate={orientation === ORIENTATION.RIGHT || orientation === ORIENTATION.DOWN}
      isLarge={props.isLarge}
    >
      {props.isDouble ?
        <ArrowDoubleIconStyled width={iconSize} height={iconSize} hover={props.hover} orientation={props.orientation}/>
        : props.isX ?
        <XIconStyled width={iconSize} height={iconSize} hover={props.hover} orientation={props.orientation}/>
        : <ArrowIconStyled width={iconSize} height={iconSize} hover={props.hover} orientation={props.orientation}/>
      }
    </Container>
  );
};
export default withHover(Arrow);

const breatheAnimation = keyframes`
  from { transform: scale3d(1, 1, 1); }
  50% { transform: scale3d(1.30, 1.30, 1.30); }
  to { transform: scale3d(1, 1, 1); }
`;

export const ICON_SIZE = 40;

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
  right: ${PROJECT_MARGIN_RIGHT}vw;
  bottom: 10vh;
`;

const ArrowIconCss = css<any>`
  fill: ${p => p.hover ? 'white' : 'black'};
  transform: rotate(${p =>
    p.orientation === ORIENTATION.LEFT ? '180deg' :
    p.orientation === ORIENTATION.UP ? '270deg' :
    p.orientation === ORIENTATION.DOWN ? '450deg' :
    '0deg'
  });
  transition: fill 1s, transform 1s;
`;

const ArrowIconStyled = styled(ArrowIcon)<any>`
  ${ArrowIconCss}
`;

const ArrowDoubleIconStyled = styled(ArrowDoubleIcon)<any>`
  ${ArrowIconCss}
`;

const XIconStyled = styled(xIcon)<any>`
  ${ArrowIconCss}
`;
