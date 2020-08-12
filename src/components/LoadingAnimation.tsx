import * as React from 'react';
import ArrowIcon from 'src/data/svgs/arrow.svg';
import styled, { keyframes } from 'styled-components';
import withHover from "../components/withHover";
import { theme, BackgroundStripe, BACKGROUND_STRIPE_RIGHT, BACKGROUND_STRIPE_WIDTH, MyText } from '../util/styles';
import { useRef, useEffect, useState, useCallback } from 'react';

interface InputProps {
  onFinishedLoading: () => void;
}

const LoadingAnimation: React.FC<InputProps> = props => {
  // When the user hovers over the circle, we want to start the expanding circle
  // animation only when the current animation iteration is finished.
  const [userTriggeredStart, setUserTriggeredStart] = React.useState(false);
  const [isExpandingCircle, setIsExpandingCircle] = React.useState(false);
  const [isScreenWipe, setIsScreenWipe] = React.useState(false);

  const circleBreathingRef = useRef(null);
  // These need to be state instead of ref, because we need to trigger a state update when the ref is set.
  const [circleExpandingEl, setCircleExpandingEl] = useState(null as any);
  const [screenWipeEl, setScreenWipeEl] = useState(null as any);

  const onRefChange = useCallback(node => setCircleExpandingEl(node), []);
  const onScreenWipeRefChange = useCallback(node => setScreenWipeEl(node), []);

  // When the user has triggered the start, expand the circle on the completion of the
  // current animation iteration.
  useEffect(() => {
    if (!!circleBreathingRef?.current && userTriggeredStart) {
      PrefixedEvent(circleBreathingRef.current, "AnimationIteration", () => setIsExpandingCircle(true));
    }
  }, [circleBreathingRef, userTriggeredStart]);

  useEffect(() => {
    if (!!circleExpandingEl) {
      PrefixedEvent(circleExpandingEl, "AnimationEnd", () => setIsScreenWipe(true));
    }
  }, [circleExpandingEl]);

  useEffect(() => {
    if (!!screenWipeEl) {
      PrefixedEvent(screenWipeEl, "AnimationEnd", () => props.onFinishedLoading());
    }
  }, [screenWipeEl]);

  return (
    <Container hideCursor={userTriggeredStart}>
      {isScreenWipe ?
        <ScreenWipe ref={onScreenWipeRefChange}/>
      :
      isExpandingCircle ?
        <CircleExpanding ref={onRefChange}/>
      :
        <>
          <CircleBreathing hover={userTriggeredStart} ref={circleBreathingRef} onMouseEnter={() => setUserTriggeredStart(true)}/>
          <StartIconContainer>
            <ArrowIconStyled width={26} hidden={userTriggeredStart}/>
          </StartIconContainer>
        </>
      }
    </Container>
  );
  // <StartText hidden={userTriggeredStart}>Start</StartText>
};
export default LoadingAnimation;

// Doesn't seem to be necessary.
// From: https://css-tricks.com/controlling-css-animations-transitions-javascript/
// var pfx = ["webkit", "moz", "MS", "o", ""];
var pfx = [''];
function PrefixedEvent(element, type, callback) {
	for (let p = 0; p < pfx.length; p++) {
		if (!pfx[p]) type = type.toLowerCase();
		element.addEventListener(pfx[p]+type, callback, false);
	}
}

const breatheAnimation = keyframes`
  from { transform: scale3d(1, 1, 1); }
  50% { transform: scale3d(1.20, 1.20, 1.20); }
  to { transform: scale3d(1, 1, 1); }
`;

const circleAnimation = keyframes`
  from { transform: scale3d(1, 1, 1); }
  to { transform: scale3d(50, 50, 50); }
`;

const Container = styled.div<any>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${p => p.hideCursor && `cursor: none;`}
  background-color: ${theme.bgColor};
`;

// Border-box sets the border to be inside the circle.
const circleBorder = '1px solid #000';
const Circle = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 80px;
  box-sizing: border-box;
  background-color: ${theme.orange};
  border: ${circleBorder};
`;

// border: ${p => p.hover ? circleBorder : '0px'};
const CircleBreathing = styled(Circle)<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0px;
  animation-name: ${breatheAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const CircleExpanding = styled(Circle)<any>`
  border: 0px;
  animation-name: ${circleAnimation};
  animation-duration: 1s;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
`;

const screenWipeAnimation = keyframes`
  from {
    right: -30vw;
    width: 180vw;
  }
  to {
    right: ${BACKGROUND_STRIPE_RIGHT}px;
    width: ${BACKGROUND_STRIPE_WIDTH}px;
  }
`;

const ScreenWipe = styled(BackgroundStripe)`
  background-color: ${theme.orange};
  animation-name: ${screenWipeAnimation};
  animation-duration: 1s;
  animation-timing-function: ease-out;
`;

const StartIconContainer = styled.div`
  pointer-events: none;

  /* Position in center of page */
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StartText = styled(MyText)<any>`
  color: white;
  font-size: 18px;
  letter-spacing: 0.06em;
  font-family: century-gothic;
  pointer-events: none;
  opacity: ${p => p.hidden ? 0 : 1};
  transition: opacity 1s;

  /* Position in center of page */
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowIconStyled = styled(ArrowIcon)<any>`
  fill: white;
  opacity: ${p => p.hidden ? 0 : 1};
  transform: rotate(${p => p.hidden ? '1080deg' : '0deg'});
  transition: opacity 1s, transform 1s;
`;
