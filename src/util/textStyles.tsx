import * as React from 'react';
import styled from 'styled-components';
import { MyText } from './styles';
import withHover, { InjectHoverProps } from 'components/withHover';
import Touchable from 'components/Touchable';

export const Link = styled.a`
  color: inherit;
`;

export const H1 = styled(MyText)`
  font-size: 5vw;
  letter-spacing: 0.2em;
`;

export const H2 = styled(MyText)`
  font-size: calc(34px + 1vw);
  font-weight: bold;
`;

export const H3 = styled(MyText)`
  font-size: calc(12px + 0.5vw);
  letter-spacing: 0.15em;
`;

export const NameBrandText = styled(MyText)`
  font-size: calc(100px + 1vh);
  letter-spacing: 0.05em;
  font-family: CenturyGothic, century-gothic, sans-serif;
`;

export const BodyRegular = styled(MyText)`
  font-size: calc(10px + 1vh);
`;

export const ButtonText = styled(MyText)`
  font-size: calc(12px + 0.2vw);
  letter-spacing: 0.01em;
  font-weight: bold;
  transform: scaleY(1.1);
`;

interface NavTextProps extends InjectHoverProps {
  active?: boolean;
}

export const NavTextBase: React.FC<NavTextProps> = props => (
  <Touchable>
    <NavTextInner {...props}>
      {props.children}
    </NavTextInner>
  </Touchable>
);

export const NavText = withHover(NavTextBase);

export const NavTextInner = styled(MyText)<any>`
  font-size: 20px;
  padding-right: 5.5vw;
  opacity: ${p => p.active ? 1 : 0.5};
  transition: opacity 1s;
  transform: ${p => p.hover ? 'scaleY(1.1) translateY(-.1em)' : ''};
  display: inline-block; /* Necessary for transform to work */
`;
