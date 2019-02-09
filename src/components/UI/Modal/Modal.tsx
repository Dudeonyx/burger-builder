import styled from '@emotion/styled/macro';
import React, { FunctionComponent } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import { IStyledModal, IModalProps } from './types';
import css from '@emotion/css/macro';

const showHandler = ({ show }: IStyledModal) =>
  show
    ? css`
        max-width: 100%;
        transform: translate(-50%, -50%);
        opacity: 1;
        visibility: unset;
      `
    : css`
        max-width: 0%;
        transform: translate(-50%, -150vh);
        opacity: 0;
        visibility: hidden;
      `;

const StyledModal = styled.div`
  position: fixed;
  z-index: ${({ zIndex }) => zIndex || 500};
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  max-height: 99vh;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
  ${showHandler};
  background-color: ${({ bgColor }) => bgColor};

  @media (min-width: ${({ minWidth }) => minWidth || 550}px) {
    width: 70%;
  }
  @media (min-width: 800px) {
    width: 580px;
  }
`;
/**
 * A reuseable Modal
 * @param {IModalProps} {
 *   children,
 *   show = false,
 *   hider,
 *   bgColor,
 *   minWidth,
 * }
 */
const Modal: FunctionComponent<IModalProps> = ({
  children,
  show = false,
  hider,
  bgColor = '#ddd66c',
  zIndex,
  minWidth,
}) => {
  return (
    <>
      <Backdrop show={show} hider={hider} zIndex={zIndex ? zIndex - 100 : undefined} />
      <StyledModal show={show} bgColor={bgColor} minWidth={minWidth} zIndex={zIndex}>
        {children}
      </StyledModal>
    </>
  );
};

export default React.memo(Modal);
