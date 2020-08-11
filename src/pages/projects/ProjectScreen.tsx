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
import { ArrowContainer, PreviousArrowContainer, NextArrowContainer } from './Project';

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
            <NextArrow
              orientation={ORIENTATION.UP}
              onScroll={scrollUpOnePage}
            />
          </PreviousArrowContainer>
          {!props.isLastScreen &&
            <NextArrowContainer>
              <NextArrow
                orientation={ORIENTATION.DOWN}
                onScroll={scrollDownOnePage}
              />
            </NextArrowContainer>
          }
        </ArrowContainer>
      </ArrowBottomRight>
    </PageContainer>
  );
};

export default ProjectScreen;
