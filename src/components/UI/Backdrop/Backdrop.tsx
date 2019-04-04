import React, { FunctionComponent, MouseEventHandler } from 'react';
import styled from '@emotion/styled/macro';

export interface StyledBackdropProps {
  zIndex?: number;
}
export interface BackdropProps extends StyledBackdropProps {
  show: boolean;
  hider: MouseEventHandler;
}

const StyledBackdrop = styled.div<StyledBackdropProps>`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.596);
  height: 100%;
  width: 100%;
  z-index: ${({ zIndex }) => zIndex || 100};
`;

const Backdrop: FunctionComponent<BackdropProps> = ({ show, hider, zIndex }) => {
  return show ? <StyledBackdrop onClick={hider} zIndex={zIndex} /> : null;
};

export default Backdrop;
