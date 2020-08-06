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
