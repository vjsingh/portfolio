import { PageProps } from "gatsby";
import * as React from 'react';
import Project, { HeaderText, MainContainer, SubheaderText, ViewProjectButton, ProjectPageProps } from './Project';
import ProjectImage from './ProjectImage';

export default function GoogleTVM(props: ProjectPageProps) {
  const [active, setActive] = React.useState(false);

  return null;
  /*
  return (
    <Project name='googleTVM' nextScreen='' bgColor={'#813A53'} active={active} closeProject={() => {}}>
      <ProjectImage name='googleTVM'/>
      <MainContainer>
        <HeaderText>Google Search UI</HeaderText>
        <SubheaderText>The next generation of immersive mobile experiences at Google.</SubheaderText>
        <ViewProjectButton/>
      </MainContainer>
    </Project>
  );
  */
}
