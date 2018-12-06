import React, {
  MouseEventHandler,
  FunctionComponent,
  CSSProperties
} from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/';

/** @interface */
export interface IModal {
  /** A boolean indicating visibility of the modal
   * @default false
   */
  show: boolean;
  /** An event handler that sets "show" to false
   * @default "() => {}"
   */
  hider: MouseEventHandler;
}
/** A reuseable Modal */
export const Modal: FunctionComponent<IModal> = ({
  children,
  show = false,
  hider
}) => {
  // console.log( '[Modal]' );
  const inlineCss: CSSProperties = show
    ? {
        /* tslint:disable:ter-indent */
        maxWidth: '100%',
        opacity: 1,
        visibility: 'unset'
      }
    : {
        maxWidth: '0%',
        opacity: 0,
        transform: 'translate(-50%, -200%)',
        visibility: 'hidden'
      };
  /* tslint:enable:ter-indent */

  return (
    <>
      <Backdrop show={show} hider={hider} />
      <div className={styles.Modal} style={inlineCss}>
        {children}
      </div>
    </>
  );
};

export default React.memo(Modal);
