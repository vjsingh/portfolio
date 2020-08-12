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
import Arrow, { ArrowBottomRight, ORIENTATION } from '../../components/Arrow';
import { MyText, PageContainer, theme } from '../../util/styles';
import { ArrowContainer, PreviousArrowContainer, ArrowInnerContainer } from './Project';

interface InputProps {
  name: string;
  isLastScreen?: boolean;
}

const ProjectScreen: React.FC<InputProps> = props => {
  return (
    <PageContainer name={props.name}>
      {props.children}
      <ArrowBottomRight>
        <ArrowContainer>
          <PreviousArrowContainer>
            <Arrow
              orientation={ORIENTATION.UP}
              onClick={scrollUpOnePage}
            />
          </PreviousArrowContainer>
          {!props.isLastScreen &&
            <ArrowInnerContainer>
              <Arrow
                orientation={ORIENTATION.DOWN}
                onClick={scrollDownOnePage}
              />
            </ArrowInnerContainer>
          }
        </ArrowContainer>
      </ArrowBottomRight>
    </PageContainer>
  );
};

export default ProjectScreen;
