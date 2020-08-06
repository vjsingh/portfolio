import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import withHover from "../components/withHover";
import { theme, BackgroundStripe, BACKGROUND_STRIPE_RIGHT, BACKGROUND_STRIPE_WIDTH } from '../util/styles';
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
    <Container>
      {isScreenWipe ?
        <ScreenWipe ref={onScreenWipeRefChange}/>
      :
      isExpandingCircle ?
        <CircleExpanding ref={onRefChange}/>
      :
        <CircleBreathing hover={userTriggeredStart} ref={circleBreathingRef} onMouseEnter={() => setUserTriggeredStart(true)}/>
      }
    </Container>
  );
};
export default LoadingAnimation;

// From: https://css-tricks.com/controlling-css-animations-transitions-javascript/
var pfx = ["webkit", "moz", "MS", "o", ""];
function PrefixedEvent(element, type, callback) {
	for (let p = 0; p < pfx.length; p++) {
		if (!pfx[p]) type = type.toLowerCase();
		element.addEventListener(pfx[p]+type, callback, false);
	}
}

const breatheAnimation = keyframes`
  from { transform: scale3d(1, 1, 1); }
  50% { transform: scale3d(1.10, 1.10, 1.10); }
  to { transform: scale3d(1, 1, 1); }
`;

const circleAnimation = keyframes`
  from { transform: scale3d(1, 1, 1); }
  to { transform: scale3d(50, 50, 50); }
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Border-box sets the border to be inside the circle.
const circleBorder = '1px solid #000';
const Circle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  box-sizing: border-box;
  background-color: ${theme.orange};
  border: ${circleBorder};
`;

const CircleBreathing = styled(Circle)<any>`
  border: ${p => p.hover ? circleBorder : '0px'};
  animation-name: ${breatheAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`;

const CircleExpanding = styled(Circle)<any>`
  border: 0px;
  animation-name: ${circleAnimation};
  animation-duration: 2s;
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
`;
