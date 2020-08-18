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

const name = 'pansaari';
const headerText = 'Pansaari';
const subheaderText = 'A slice of Rajasthan in Washington DC';
const linkHref = 'https://www.instagram.com/pansaari/?hl=en';
const overviewText = `Pansaari was a "third space" in Washington DC - an Indian chaibar, restaurant, event space, and more.\n\nAs the business grew, it became important to effectively describe the various offerings and events online. Working collaboratively with a designer I helped build the website.\n\nI also built a custom "tiffin" ordering system, that enabled customers to buy a meal subscription, and select and order a pre-filled meal online. These orders would go to a google sheet that was printed for the staff every morning, and customers had a cost-effective way of receiving healthy, nutritious meals with zero waste.`;
const color = getPageColor(name);

const Pansaari: React.FC<PageProps> = props => {
  const ProjectInner = makeProjectInner(name, headerText, subheaderText, linkHref);

  return (
    <ProjectContainer
      name={name}
      renderPage={(onExpand, active) => <ProjectInner onExpand={onExpand} active={active}/>}
      renderExpandedScreens={[
        () => <Background headerText='Pansaari' overviewText={overviewText} color={color}/>,
        () => <ProjectPlaceholder/>
      ]}
    />
  );
}

export default Pansaari;
