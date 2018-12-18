import React, {
  MouseEventHandler,
  FunctionComponent,
  CSSProperties,
} from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import styled from 'styled-components/macro';

/** @interface */
export interface IModalProps {
  /** A boolean indicating visibility of the modal
   * @default false
   */
  show: boolean;
  /** An event handler that sets "show" to false
   * @default "() => {}"
   */
  hider: MouseEventHandler;
  /**
   * @type {string}
   * @memberof IModal
   */
  bgColor?: string;
  /**
   * @type {number}
   * @memberof IModal
   */
  minWidth?: number;
}
const StyledModal = styled.div`
  position: fixed;
  z-index: 500;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  max-height: 99vh;
  background-color: #ddd66c;
  border-radius: 10px;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
  max-width: ${(props: {
    bgColor?: string;
    show: boolean;
    minWidth?: number;
  }) => (props.show ? '100%' : '0%')};
  transform: ${({ show }) =>
    show ? 'translate(-50%, -50%)' : 'translate(-50%, -150vh)'};
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'unset' : 'hidden')};
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
  bgColor,
  minWidth,
}) => {
  return (
    <>
      <Backdrop show={show} hider={hider} />
      <StyledModal show={show} bgColor={bgColor} minWidth={minWidth}>
        {children}
      </StyledModal>
    </>
  );
};

export default React.memo(Modal);
