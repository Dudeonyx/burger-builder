import React, { FunctionComponent, MouseEventHandler } from 'react';
import styled from '@emotion/styled/macro';

export interface IStyledBackdropProps {
  zIndex?: number;
}
export interface IBackdropProps extends IStyledBackdropProps {
  show: boolean;
  hider: MouseEventHandler;
}

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.596);
  height: 100%;
  width: 100%;
  z-index: ${({ zIndex }: IStyledBackdropProps) => zIndex || 100};
`;

const Backdrop: FunctionComponent<IBackdropProps> = ({
  show,
  hider,
  zIndex,
}) => {
  return show ? <StyledBackdrop onClick={hider} zIndex={zIndex} /> : null;
};

export default Backdrop;
