import React from 'react';
import styles from './Modal.module.css';
import Aux from '../../../hocs/ax';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  console.log( '[Modal]' );
  return (
    <Aux>
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
    </Aux>
  );
};

const isPropsShowEqual = ( prevProps, nextProps ) => {
  return prevProps.show === nextProps.show;
};
export default React.memo( Modal, isPropsShowEqual );
