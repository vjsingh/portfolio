import * as React from 'react';
import { doScrollInProject } from 'util/pageUtil';
import Arrow, { ArrowBottomRight, ORIENTATION } from '../../components/Arrow';
import { PageContainer } from '../../util/styles';
import { ArrowContainer, ArrowInnerContainer, PreviousArrowContainer } from './Project';

interface InputProps {
  name: string;
  isLastScreen?: boolean;
  ix: number;
}

const ProjectScreen: React.FC<InputProps> = props => {
  return (
    <PageContainer name={props.name} id={`ProjectScreen${props.ix}`}>
      {props.children}
      <ArrowBottomRight>
        <ArrowContainer>
          <PreviousArrowContainer>
            <Arrow
              orientation={ORIENTATION.UP}
              onClick={() => doScrollInProject(props.ix - 1)}
            />
          </PreviousArrowContainer>
          {!props.isLastScreen &&
            <ArrowInnerContainer>
              <Arrow
                orientation={ORIENTATION.DOWN}
                onClick={() => doScrollInProject(props.ix + 1)}
              />
            </ArrowInnerContainer>
          }
        </ArrowContainer>
      </ArrowBottomRight>
    </PageContainer>
  );
};

export default ProjectScreen;
