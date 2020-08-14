import styled from 'styled-components';
import * as React from 'react';

export const theme = {
  orange: '#FF6A48',
  gray50: 'rgba(0, 0, 0, .50)',
  gray30: 'rgba(0, 0, 0, .30)',
  purple: '#6319ff',
  bgColor: '#b4b4b4',
  bgColorHome: '#ffffff',
};

export const PushRight = styled.span`
  margin-left: auto;
`;

// font-family: CenturyGothic, century-gothic, sans-serif;
export const MyText = styled.span`
  font-family: freight-big-pro, sans-serif;
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
  background-color: ${theme.bgColor};
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

// From: https://gist.github.com/jedfoster/7939513
export function mixColors(c1, c2, weight) {
  if (!c1 || !c2) {
    return '';
  }

  // Remove any '#'s
  c1 = c1.replace(/#/g , '');
  c2 = c2.replace(/#/g , '');

  function d2h(d) { return d.toString(16); }  // convert a decimal value to hex
  function h2d(h) { return parseInt(h, 16); } // convert a hex value to decimal 
  weight = (typeof(weight) !== 'undefined') ? weight : 50; // set the weight to 50%, if that argument is omitted
  weight = 100 - weight; // Weight was backwards for some reason

  var color = "#";

  for(var i = 0; i <= 5; i += 2) { // loop through each of the 3 hex pairs—red, green, and blue
    var v1 = h2d(c1.substr(i, 2)), // extract the current pairs
        v2 = h2d(c2.substr(i, 2)),
        
        // combine the current pairs from each source color, according to the specified weight
        val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0))); 

    while(val.length < 2) { val = '0' + val; } // prepend a '0' if val results in a single digit
    
    color += val; // concatenate val to our new color string
  }
    
  return color; // PROFIT!
};
