import * as React from 'react';
import styled from 'styled-components';
import { theme } from '../../util/styles';
import Project, { HeaderText, MainContainer, ProjectPageProps, PROJECT_EXPANDING_DURATION, SubheaderText, ViewProjectButton } from './Project';
import ProjectImage from "./ProjectImage";
import { ReactNode } from 'react';

interface InputProps {
  renderPage: (onExpand: () => void, active: boolean) => ReactNode;
  renderExpandedScreens: Array<() => ReactNode>;
  name: string;
  bgColor: string;
}

const ProjectContainer: React.FC<InputProps> = props => {
  const { renderPage } = props;

  if (renderPage) { // Gatsby won't build without this... not sure why.
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
      bgColor: props.bgColor,
      active: expanding || active,
      closeProject: closeProject,
    };

    return (
      <>
        {/* Note: This container div is needed because of an interaction between */}
        {/* ScrollMagic and the setTimeout above. */}
        <div>
          <Project {...projectProps}>
            {renderPage(onExpand, expanding || active)}
          </Project>
        </div>
        {active &&
          <Container>
            <InnerContainer id='ProjectContainer'>
              <Project {...projectProps} dontMakeScene={true}>
                {renderPage(() => {}, expanding || active)}
              </Project>
              {props.renderExpandedScreens.map((renderScreen, ix)=> (
                <Project {...projectProps} isExpandedScreen={true} key={ix}>
                  {renderScreen()}
                </Project>
              ))}
            </InnerContainer>
          </Container>
        }
      </>
    );
  }

  return null;
}
export default ProjectContainer;

export interface ProjectInnerProps {
  onExpand: () => void;
  active: boolean;
}

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10;
  background-color: white;
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
