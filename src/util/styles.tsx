import styled from 'styled-components';

export const theme = {
  orange: '#FF6A48',
};

export const PushRight = styled.span`
  margin-left: auto;
`;

export const MyText = styled.text`
  font-family: CenturyGothic;
`;

/*
export const PageContainer = (props: any) => (
  <PageContainerView>
    {props.children}
  </PageContainerView>
);
 */

export const PageContainer = styled.div.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    ['name'].includes(prop) || defaultValidatorFn(prop)
})<any>`
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  max-width: 100vw;
  height: 100vh;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
`;
