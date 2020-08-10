import Touchable from 'components/Touchable';
import withHover from 'components/withHover';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { scroller } from 'react-scroll';
import ScrollMagic from 'scrollmagic';
import styled from 'styled-components';
import AppContext from 'util/AppContext';
import { scrollerArgs } from 'util/constants';
import { getNextPage, scrollToHome, getPreviousPage, scrollDownOnePage, scrollUpOnePage, isLastPage } from 'util/pageUtil';
import { ButtonText, H1, H3 } from 'util/textStyles';
import NextArrow, { ArrowBottomRight, ORIENTATION } from '../../components/NextArrow';
import { MyText, PageContainer, theme } from '../../util/styles';

interface InputProps {
  name: string;
  bgColor: string;
  active: boolean;
  closeProject: () => void;
  isExpandedScreen?: boolean;
}

const Project: React.FC<InputProps> = props => {
  const { active } = props;
  const context = useContext(AppContext);

  // Add ScrollMagic Scene.
  useEffect(() => {
    if (!props.isExpandedScreen && context.scrollMagicController) {
      new ScrollMagic.Scene({
        triggerElement: '#' + props.name,
        duration: 200,
        triggerHook: 'onLeave', // Start pinning when the view is fully on screen (or 'about to leave')
      })
      .setPin('#' + props.name)
      .addTo(context.scrollMagicController);
    }
  }, [context?.scrollMagicController]);

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

  return (
    <Container id={props.name} name={props.name} active={active}>
      {props.children}
      {!props.isExpandedScreen && <ProjectBackground active={active} color={props.bgColor}/>}
      {!props.isExpandedScreen &&
        <HomeTextContainer onClick={active ? onBack : scrollToHome}>
          <HomeText>{active ? 'Back' : 'Home'}</HomeText>
        </HomeTextContainer>
      }
      {!props.isExpandedScreen &&
        <NameBrand>
          <Varun>VARUN</Varun>
          <Singh>SINGH</Singh>
        </NameBrand>
      }
      <ArrowBottomRight>
        <ArrowContainer>
          <PreviousArrowContainer hidden={!props.isExpandedScreen && active}>
            <NextArrow
              nextPage={getPreviousPage(props.name)}
              orientation={props.isExpandedScreen ? ORIENTATION.UP : ORIENTATION.LEFT}
              onScroll={!active ? undefined : scrollUpOnePage}
            />
          </PreviousArrowContainer>
          {!isLastPage(props.name) &&
            <NextArrowContainer hidden={!props.isExpandedScreen && active}>
              <NextArrow
                nextPage={getNextPage(props.name)}
                orientation={active ? ORIENTATION.DOWN : ORIENTATION.RIGHT}
                onScroll={!active ? undefined : scrollDownOnePage}
              />
            </NextArrowContainer>
          }
        </ArrowContainer>
      </ArrowBottomRight>
    </Container>
  );
};

export default Project;

export interface ProjectPageProps {
}

export const PROJECT_EXPANDING_DURATION = 1000;

export const ViewProjectButtonBase = props => (
  <ButtonContainer {...props}>
    <ButtonText>VIEW PROJECT</ButtonText>
  </ButtonContainer>
);
export const ViewProjectButton = withHover(ViewProjectButtonBase);

const ButtonContainer = styled(Touchable)<any>`
  display: flex;
  align-items: center;
  height: 7.5vh;
  border: 1px solid black;
  padding: 0 2vw;
  background-color: ${p => p.hover ? theme.gray30 : 'white'};
  opacity: ${p => p.hidden ? 0 : 1};
  transition: opacity 1s;
`;

export const MainContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin-right: 7.7vw;
  width: 50vw;
`;

export const HeaderText = styled(H1)`
  text-align: right;
  margin-bottom: 4vh;
`;


export const SubheaderText = styled(H3)`
  text-align: right;
  margin-bottom: 5vh;
`;

const Container = styled(PageContainer)<any>`
  ${p => p.active ? `
  ` : ''}
`;

export const ProjectBackground = styled.div<any>`
  position: absolute;
  left: -30vw;
  top: 0;
  bottom: 0;
  width: ${p => p.active ? '130vw' : '72vw'};
  background-color: ${p => p.color};
  z-index: -1;
  transform: ${p => p.active ? '' : 'skew(10deg)'};
  transform-origin: 100% 0;
  transition: transform ${PROJECT_EXPANDING_DURATION}ms, width ${PROJECT_EXPANDING_DURATION}ms;
`;

const PreviousArrowContainer = styled.div<any>`
  opacity: ${p => p.hidden ? 0 : 1};
  transition: opacity 1s;
`;

const NextArrowContainer = styled.div<any>`
  margin-left: 24px;
`;

const ArrowContainer = styled.div<any>`
  flex-direction: row;
  display: flex;
`;

const HomeTextContainer = styled(ButtonContainer)`
  position: absolute;
  left: 5.7vw;
  top: 4.8vh;
  height: calc(40px + 0.3vh);
`;

const HomeText = styled(ButtonText)`
  letter-spacing: 0.1em;
`;

/*
const HomeTextContainer = styled(Touchable)`
  position: absolute;
  left: 5.7vw;
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
  left: 5.7vw;
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
