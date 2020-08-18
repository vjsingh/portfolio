import { graphql, PageProps } from "gatsby";
import * as React from 'react';
import styled from 'styled-components';
import { H1 } from "util/textStyles";
import { theme } from '../../util/styles';
import { HeaderText, MainContainer, SubheaderText, ViewProjectButton, ProjectPlaceholder, makeProjectInner } from './Project';
import ProjectContainer, { ProjectInnerProps } from "./ProjectContainer";
import ProjectImage from "./ProjectImage";
import { PAGE_COLORS, getPageIx, PAGES, getPageColor } from "util/pageUtil";
import Background from "./views/Background";

const name = 'transcriptionHub';
const headerText = 'Transcription Hub';
const subheaderText = 'Online database of jazz solo transcriptions';
const linkHref = 'http://transcription-hub.com';
const overviewText = `I conceived of and built Transcription Hub largely during one winter break of undergrad.\n\nTranscription Hub aims to make the vast trove of jazz solo transcriptions searchable and shareable online. Users can register and upload jazz transcriptions, as well as browse them by artist, instrument, or album.\n\nTo incentivize users to become contributing members of the site, I created a "bounty"-style system. Users receive karma points for their uploads, and can use their points to request missing transcriptions.`;
const color = getPageColor(name);

const TranscriptionHub: React.FC<PageProps> = props => {
  const ProjectInner = makeProjectInner(name, headerText, subheaderText, linkHref);

  return (
    <ProjectContainer
      name={name}
      renderPage={(onExpand, active) => <ProjectInner onExpand={onExpand} active={active}/>}
      renderExpandedScreens={[
        () => <Background headerText='Transcription Hub' overviewText={overviewText} color={color}/>,
        () => <ProjectPlaceholder/>
      ]}
    />
  );
}

export default TranscriptionHub;
