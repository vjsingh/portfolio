import Touchable from 'components/Touchable';
import ExternalLinkIcon from 'src/data/svgs/externalLink.svg';
import withHover from 'components/withHover';
import * as React from 'react';
import { useContext, useEffect, useRef } from 'react';
import { scroller } from 'react-scroll';
import ScrollMagic from 'scrollmagic';
import styled from 'styled-components';
import AppContext from 'util/AppContext';
import { scrollerArgs } from 'util/constants';
import { getNextPage, scrollToHome, getPreviousPage, scrollDownOnePage, scrollUpOnePage, isLastPage, PAGE_COLORS, getNextPageIx, getPageIx, getPageColor, getNextPageColor } from 'util/pageUtil';
import { ButtonText, H1, H3 } from 'util/textStyles';
import Arrow, { ArrowBottomRight, ORIENTATION, ICON_SIZE } from '../../components/Arrow';
import { MyText, PageContainer, theme, mixColors } from '../../util/styles';
import { useHandleScroll } from 'util/effects';
import ProjectImage from './ProjectImage';
import { ProjectInnerProps } from './ProjectContainer';

interface InputProps {
  name: string;
  active: boolean;
  collapsing: boolean;
  closeProject: () => void;
  dontMakeScene?: boolean;
}

export const PROJECT_SCENE_DURATION = 600;

const Project: React.FC<InputProps> = props => {
  const [scene, setScene] = React.useState(null);
  const [scroll, setScroll] = React.useState(null);
  const containerEl = useRef(null);

  const { active } = props;

  const context = useContext(AppContext);

  // Add ScrollMagic Scene.
  useEffect(() => {
    let scene;
    if (!props.dontMakeScene && context.scrollMagicController) {
      scene = new ScrollMagic.Scene({
        triggerElement: '#' + props.name,
        duration: isLastPage(props.name) ? 1 : PROJECT_SCENE_DURATION,
        triggerHook: 'onLeave', // Start pinning when the view is fully on screen (or 'about to leave')
      })
      .setPin('#' + props.name)
      .addTo(context.scrollMagicController);

      setScene(scene);
    }

    return () => {
      scene?.destroy();
    };
  }, [context?.scrollMagicController]);

  useHandleScroll(setScroll); // Re-render the view on scroll.

  useEffect(() => {
  }, [containerEl]);

  let progress = scene?.progress();
  let bgColor = getPageColor(props.name);

  if (!isLastPage(props.name) && !active) {
    bgColor = mixColors(getPageColor(props.name), getNextPageColor(props.name), progress * 100);
  }

  const leftPos = PROJECT_BACKGROUND_LEFT_START + (progress * (95 - PROJECT_BACKGROUND_LEFT_START));
  const angle = PROJECT_BACKGROUND_ANGLE_START - (progress * (0 + PROJECT_BACKGROUND_ANGLE_START));


  // Center on the project page when expanding.
  React.useEffect(() => {
    if (active) {
      scroller.scrollTo(props.name, {
        ...scrollerArgs,
      });
    }
  }, [active]);

  const onBack = () => {
    props.closeProject();
    // Scroll immediately back to where we were.
    // Users can still scroll horizontally when projects are open, even though
    // it appears you can't because of the fixed position overlay.
    scroller.scrollTo(props.name, {
      duration: 0,
      horizontal: true,
    });
  };

  const isLast = isLastPage(props.name);

  return (
    <Container id={props.name} name={props.name} active={active} ref={containerEl}>
      <ProjectBackground active={active} collapsing={props.collapsing} color={bgColor} left={leftPos} angle={angle}/>
      <ContainerInner>
        {props.children}
        <HomeContainer active={active}>
          <Arrow
            orientation={ORIENTATION.LEFT}
            onClick={active ? onBack : scrollToHome}
            isDouble={active ? false : true}
            isX={active ? true : false}
          />
        </HomeContainer>
        <NameBrand>
          <Varun>VARUN</Varun>
          <Singh>SINGH</Singh>
        </NameBrand>
        <ArrowBottomRight>
          <ArrowContainer>
            <PreviousArrowContainer hidden={active && !isLast}>
              <Arrow
                nextPage={getPreviousPage(props.name)}
                orientation={(active && isLast) ? ORIENTATION.DOWN : ORIENTATION.LEFT}
                onClick={!active ? undefined : scrollDownOnePage}
              />
            </PreviousArrowContainer>
            {!isLast &&
              <ArrowInnerContainer>
                <Arrow
                  nextPage={getNextPage(props.name)}
                  orientation={active ? ORIENTATION.DOWN : ORIENTATION.RIGHT}
                  onClick={!active ? undefined : scrollDownOnePage}
                />
              </ArrowInnerContainer>
            }
          </ArrowContainer>
        </ArrowBottomRight>
      </ContainerInner>
    </Container>
  );
};

export default Project;

export interface ProjectPageProps {
}

export const PROJECT_EXPANDING_DURATION = 1000;
export const PROJECT_COLLAPSING_DURATION = 1000;
export const PROJECT_MARGIN_LEFT = 5.7;
export const PROJECT_MARGIN_RIGHT = 10;

export const ViewProjectButtonBase = props => (
  <ButtonContainer {...props}>
    <ButtonTextStyled {...props}>VIEW PROJECT</ButtonTextStyled>
  </ButtonContainer>
);
export const ViewProjectButton = withHover(ViewProjectButtonBase);

const BUTTON_HEIGHT = '7.5vh';
const ButtonContainer = styled(Touchable)<any>`
  display: flex;
  align-items: center;
  height: ${BUTTON_HEIGHT};
  background-color: ${p => p.hover ? theme.gray30 : p.color};
  padding: 0 3em;
  opacity: ${p => p.hidden ? 0 : 1};
  transition: opacity 1s;
  ${p => p.hidden ? 'pointer-events: none;' : ''}
  border-radius: 40px;
`;

const ButtonTextStyled = styled(ButtonText)<any>`
  color: ${p => p.hover ? 'white' : 'white'};
`;

// width: 55vw;
// right: 0;
export const MainContainer = styled.div<any>`
  position: absolute;
  top: ${p => p.isHorizontal ? '10vw' : 0};
  left: 30vw;
  bottom: 0;
  display: flex;
  min-width: 50vw;
  align-items: center;
  justify-content: flex-end;
  margin-right: ${PROJECT_MARGIN_RIGHT}vw;
`;

export const MainContainerInner = styled.div`
  width: 100%;
  min-width: 30vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  background-color: white;
  padding: 40px 24px 40px 40px;
  border-radius: 4px;
`;

export const HeaderText = styled(H1)`
  text-align: right;
  margin-bottom: 4vh;
`;


export const SubheaderText = styled(H3)`
  text-align: right;
  margin-bottom: 4vh;
`;

const Container = styled(PageContainer)<any>`
  ${p => p.active ? `
  ` : ''}
`;

const PROJECT_BACKGROUND_LEFT_START = -20;
const PROJECT_BACKGROUND_ANGLE_START = 10;
export const ProjectBackground = styled.div<any>`
  position: absolute;
  left: ${p => p.active ? `${PROJECT_BACKGROUND_LEFT_START}vw` : `${p.left}vw`};
  top: 0;
  bottom: 0;
  width: ${p => p.active ? '130vw' : '62vw'};
  background-color: ${p => p.color};
  z-index: 0;
  transform: ${p => `skew(${p.angle}deg)`};
  transform-origin: 100% 0;
  transition: width ${PROJECT_EXPANDING_DURATION}ms ${p => p.active || p.collapsing ? `, left ${PROJECT_EXPANDING_DURATION}ms` : ''};
`;

export const PreviousArrowContainer = styled.div<any>`
  opacity: ${p => p.hidden ? 0 : 1};
  transition: opacity 1s;
`;

export const ArrowContainer = styled.div<any>`
  display: flex;
  margin-left: 24px;
`;

export const ArrowInnerContainer = styled.div<any>`
  flex-direction: row;
  display: flex;
`;

const HomeContainer = styled.div<any>`
  position: absolute;
  left: ${p => p.active ? `calc(${100 - PROJECT_MARGIN_RIGHT}% - ${ICON_SIZE}px)` : `${PROJECT_MARGIN_LEFT}vw`};
  top: 4.8vh;
  transition: left 1s; right 1s;
`;

const HomeText = styled(ButtonText)`
  letter-spacing: 0.1em;
`;


/*
const HomeTextContainer = styled(Touchable)`
  position: absolute;
  left: ${PROJECT_MARGIN_LEFT}vw;
  top: 4.8vh;
  width: 100px;
  height: 50px;
`;

const HomeText = styled(MyText)`
  cursor: pointer;
  font-size: 24px;
`;
*/

export const NameBrand = styled.div`
  position: absolute;
  left: ${PROJECT_MARGIN_LEFT}vw;
  bottom: 4.8vh;
  display: flex;
  flex-direction: column;
`;

const NameBrandText = styled(MyText)`
  font-size: 30px;
  letter-spacing: 0.05em;
`;

export const Varun = styled(NameBrandText)`
`;

export const Singh = styled(NameBrandText)`
  margin-left: 2.8em;
  margin-top: -0.5em;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: .03em;
  -webkit-text-stroke-color: black;
`;

const ContainerInner = styled.div`
  z-index: 1;
`;

export const ProjectPlaceholder: React.FC = props => {
  return (
    <>
      <MainContainer style={{right: 0}}>
        <HeaderText>Coming Soon</HeaderText>
      </MainContainer>
    </>
  );
};

export function makeProjectInner(name, headerText, subheaderText, linkHref?, isHorizontal?) {
  const ProjectInner: React.FC<ProjectInnerProps> = props => (
    <>
      <ProjectImage name={name} isHorizontal={isHorizontal}/>
      <MainContainer isHorizontal={isHorizontal}>
        <MainContainerInner>
          <HeaderText>{headerText}</HeaderText>
          <SubheaderText>{subheaderText}</SubheaderText>
          <BottomContainer active={props.active} short={props.active && !linkHref}>
            <ViewProjectButton hidden={props.active} onClick={props.onExpand} color={getPageColor(name)}/>
            {!!linkHref &&
              <ExternalLinkContainer hidden={!props.active} onClick={!linkHref ? () => {} : () => window.open(linkHref, '_blank')}>
                <ExternalLinkText>VISIT</ExternalLinkText>
                <ExternalLinkIcon width={24} height={24} fill='black'/>
              </ExternalLinkContainer>
            }
          </BottomContainer>
        </MainContainerInner>
      </MainContainer>
    </>
  );

  return ProjectInner;
}

const ExternalLinkContainer = styled(Touchable)`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  width: 300px;
  opacity: ${p => p.hidden ? 0 : 1};
  transition: opacity 1s;
  ${p => p.hidden ? 'pointer-events: none;' : ''}
`;

export const ExternalLinkText = styled(H3)`
  text-align: right;
  color: blue;
  padding-right: 8px;
  font-size: 18px;
`;

const BottomContainer = styled.div<any>`
  position: relative;
  height: ${p => p.short ? '0' : p.active ? '40px' : BUTTON_HEIGHT};
  transition: height 1s;
`;
