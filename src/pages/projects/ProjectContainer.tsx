import * as React from 'react';
import styled from 'styled-components';
import { theme } from '../../util/styles';
import Project, { HeaderText, MainContainer, ProjectPageProps, PROJECT_EXPANDING_DURATION, SubheaderText, ViewProjectButton } from './Project';
import ProjectImage from "./ProjectImage";
import { ReactNode } from 'react';

interface InputProps {
  renderPage: (onExpand: () => void) => ReactNode;
  renderExpandedScreens: Array<() => ReactNode>;
  name: string;
  nextScreen: string;
}

const ProjectContainer: React.FC<InputProps> = props => {
  const [expanding, setExpanding] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const onExpand = () => {
    setExpanding(true);
    setTimeout(() => {
      setExpanding(false);
      setActive(true);
    }, PROJECT_EXPANDING_DURATION);
  }

  const closeProject = () => {
    setExpanding(false);
    setActive(false);
  };

  const projectProps = {
    name: props.name,
    nextScreen: props.nextScreen,
    bgColor: theme.orange,
    active: expanding || active,
    closeProject: closeProject,
  };

  return (
    <>
      <Project {...projectProps}>
        {props.renderPage(onExpand)}
      </Project>
      {active &&
        <Container>
          <InnerContainer>
            <Project {...projectProps}>
              {props.renderPage(() => {})}
            </Project>
            {props.renderExpandedScreens.map(renderScreen => (
              <Project {...projectProps}>
                {renderScreen()}
              </Project>
            ))}
          </InnerContainer>
        </Container>
      }
    </>
  );
}
export default ProjectContainer;

export interface ProjectInnerProps {
  onExpand: () => void;
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background-color: ${theme.orange};
  z-index: 10;
`;

// https://stackoverflow.com/questions/43100350/css-overlay-with-scrolling-content
// height: 100vh seems to add enough spaces for any number of pages, for some reason.
const InnerContainer = styled.div`
  overflow-y: scroll;
  height: 200vh;
  &:after {
    content: '';
    display: block;
    height: 100vh;
  }
`;
