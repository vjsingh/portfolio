import { graphql, PageProps } from "gatsby";
import * as React from 'react';
import styled from 'styled-components';
import { H1 } from "util/textStyles";
import { theme } from 'util/styles';
import { HeaderText, MainContainer, SubheaderText, ViewProjectButton, ProjectPlaceholder, makeProjectInner } from './Project';
import ProjectContainer, { ProjectInnerProps } from "./ProjectContainer";
import ProjectImage from "./ProjectImage";
import { PAGE_COLORS, getPageIx, PAGES, getPageColor } from "util/pageUtil";
import Background from "./views/Background";

const name = 'virion';
const headerText = 'Virion';
const subheaderText = 'Enchanting online immunology game.';
const linkHref = 'http://www.itsvirion.com';
const overviewText = `Virion is an immersive online game that features enchanting audio, deceptively simple gameplay, and broodily gorgeous visuals. As the antagonist, you play as a single virus cell, or a Virion, attempting to infect the human body. Your only hope is to continue infecting new host cells before the immune system can kill off your remaining virotic cells.\n\nVirion was the winner of the 2011 Zynga Hidden Agenda game competition. While playing the game players intuitively learn about the basics of immunology, including B cells, T cells, macrophages, antibodies, and mutations.\n\nVirion was made using HTML5 and processing.js before it was cool.`;
const color = getPageColor(name);

const Virion: React.FC<PageProps> = props => {
  const ProjectInner = makeProjectInner(name, headerText, subheaderText, linkHref);

  return (
    <ProjectContainer
      name={name}
      renderPage={(onExpand, active) => <ProjectInner onExpand={onExpand} active={active}/>}
      renderExpandedScreens={[
        () => <Background headerText='Virion' overviewText={overviewText} color={color}/>,
        () => <ProjectPlaceholder/>
      ]}
    />
  );
}
export default Virion;
