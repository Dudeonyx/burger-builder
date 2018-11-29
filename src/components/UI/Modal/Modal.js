import React from 'react';
import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  console.log( '[Modal]' );
  return (
    <>
      <Backdrop show={props.show} hider={props.hider} />
      <div
        className={styles.Modal}
        style={{
          transform: props.show ? '' : 'translate(-50%, -200%)',
          opacity: props.show ? '1' : '0',
          maxWidth: props.show ? '100%' : '0%',
          visibility: props.show ? '' : 'hidden',
        }}
      >
        {props.children}
      </div>
    </>
  );
};

const isPropsShowEqual = ( prevProps, nextProps ) => {
  return prevProps.show === nextProps.show && nextProps.children === prevProps.children;
};
export default React.memo( Modal, isPropsShowEqual );
