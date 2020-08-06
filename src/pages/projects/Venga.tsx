import { PageProps } from "gatsby";
import * as React from 'react';
import styled from 'styled-components';
import { MyText, theme } from '../../util/styles';
import Project, { ViewProjectButton, MainContainer, SubheaderText, HeaderText } from './Project';
import ProjectImage from "./ProjectImage";
import ScrollMagic from "scrollmagic";
import { useContext, useEffect } from "react";
import AppContext from "util/AppContext";

export default function Venga(props: PageProps) {
  const context = useContext(AppContext);

  useEffect(() => {
    if (context.scrollMagicController) {
      var scene = (new ScrollMagic.Scene({
        triggerElement: '#venga',
        duration: 200,
        triggerHook: 'onLeave', // Start pinning when the view is fully on screen (or 'about to leave')
      }) as any)
      .setPin('#venga')
      .addTo(context.scrollMagicController);
    } else {
      console.log('null controller in Venga');
    }
  }, [context]);

  return (
    <Project name='venga' nextScreen='googleTVM' bgColor={theme.orange}>
      <ProjectImage name='venga'/>
      <MainContainer>
        <HeaderText>VENGA CLIMB</HeaderText>
        <SubheaderText>A digital membership engagement platform for rock climbing gyms.</SubheaderText>
        <ViewProjectButton/>
      </MainContainer>
    </Project>
  );
}
