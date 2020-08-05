import styled from 'styled-components';
import * as React from 'react';

export interface InjectHoverProps {
  hover?: boolean;
  setZIndex?: (val: number) => void;
}

export default <P extends InjectHoverProps>(BaseComponent: React.FC<P>): React.FC<P> => {
  const withHoverComponent: React.FC<P> = props => {
    const [hover, setHover] = React.useState(false);
    const [zIndex, setZIndex] = React.useState(0);
    return (
      <Container zIndex={zIndex} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <BaseComponent setZIndex={setZIndex} hover={hover} {...(props as P)} />
      </Container>
    );
  };
  return withHoverComponent;
};

const Container = styled.div<any>`
  position: relative;
  z-index: ${p => p.zIndex ?? 0};
`;
