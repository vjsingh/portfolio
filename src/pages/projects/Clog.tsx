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

const name = 'clog';
const headerText = 'Clog the Internet';
const subheaderText = 'Subversive digital protesting tool for the #BLM movement.';
const linkHref = 'http://www.clogtheinternet.com';
const overviewText = `Clog the Internet is a digital tool aimed at facilitating the Black Lives Matter protests of 2020. We recognize that a large portion of the value of protests derive from their disruptive and unavoidable nature. By contrast, many online protests have limited value and reach due to the insular nature of our social networks, à la "filter bubbles" or "echo chambers."\n\nClog the internet generates semi-random hashtags, based on pre-defined selection criteria and categories. By attaching the hashtags in their posts, online activists can amplify the reach of their messages and protests.\n\nClog the internet was developed largely in a one-day sprint with Jonathan Koh, Courtney Skabelund, and Miles Robbins.`;
const color = getPageColor(name);

const Clog: React.FC<PageProps> = props => {
  const ProjectInner = makeProjectInner(name, headerText, subheaderText, linkHref);

  return (
    <ProjectContainer
      name={name}
      renderPage={(onExpand, active) => <ProjectInner onExpand={onExpand} active={active}/>}
      renderExpandedScreens={[
        () => <Background headerText='Clog the Internet' overviewText={overviewText} color={color}/>,
        () => <ProjectPlaceholder/>
      ]}
    />
  );
}
export default Clog;
