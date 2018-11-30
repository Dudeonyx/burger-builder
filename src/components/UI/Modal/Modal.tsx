import React, {
  MouseEventHandler,
  FunctionComponent,
  CSSProperties,
} from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

export interface IModal {
  show: boolean;
  hider: MouseEventHandler;
}
const Modal: FunctionComponent<IModal> = ( { children, show, hider } ) => {
  console.log( '[Modal]' );
  const inlineCss: CSSProperties = show
    ? {
        /* tslint:disable:ter-indent */
        opacity: 1,
        maxWidth: '100%',
        visibility: 'unset',
      }
    : {
        transform: 'translate(-50%, -200%)',
        opacity: 0,
        maxWidth: '0%',
        visibility: 'hidden',
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

export default React.memo( Modal );
