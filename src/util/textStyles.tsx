import * as React from 'react';
import styled from 'styled-components';
import { MyText } from './styles';

export const Link = styled.a`
  color: inherit;
`;

export const NavText = styled(MyText)`
  font-size: 20px;
  padding-right: 5.5vw;
`;

export const H1 = styled(MyText)`
  font-size: calc(40px + 1vw);
  letter-spacing: 0.2em;
`;

export const H2 = styled(MyText)`
  font-size: calc(34px + 1vw);
  font-weight: bold;
`;

export const H3 = styled(MyText)`
  font-size: calc(12px + 1vw);
  letter-spacing: 0.2em;
`;

export const NameBrandText = styled(MyText)`
  font-size: calc(100px + 1vh);
  letter-spacing: 0.05em;
`;

export const BodyRegular = styled(MyText)`
  font-size: calc(10px + 1vh);
`;

export const ButtonText = styled(MyText)`
  font-size: calc(12px + 0.5vw);
  letter-spacing: .3em;
`;
