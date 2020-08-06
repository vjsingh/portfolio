import styled from 'styled-components';
import * as React from 'react';

export const theme = {
  orange: '#FF6A48',
};

export const PushRight = styled.span`
  margin-left: auto;
`;

export const MyText = styled.span`
  font-family: CenturyGothic;
`;

interface PageContainerProps {
  name: string;
}

export const PageContainer: React.FC<PageContainerProps> = props => (
  <PageContainerView id={props.name} {...props}>
    {props.children}
  </PageContainerView>
);

// NOTE: 'width' is required here for ScrollMagic to work.
export const PageContainerView = styled.div.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    ['name'].includes(prop) || defaultValidatorFn(prop)
})<any>`
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  max-width: 100vw;
  width: 100vw;
  height: 100vh;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;

export const BACKGROUND_STRIPE_RIGHT = 0;
export const BACKGROUND_STRIPE_WIDTH = 200;
export const BACKGROUND_TRIANGLE_RIGHT = -400;
export const BACKGROUND_TRIANGLE_WIDTH = 400;
export const BackgroundStripe = styled.div<any>`
  position: absolute;
  right: ${p => (p.right ?? BACKGROUND_STRIPE_RIGHT) + 'px'};
  top: 0;
  bottom: 0;
  width: ${p => (p.width ?? BACKGROUND_STRIPE_WIDTH) + 'px'};
  background-color: ${theme.orange};
  z-index: -1;
  transform: skew(-20deg);
  transform-origin: 100% 0;
`;
