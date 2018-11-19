import React from 'react';
import classer from 'react-classer';
import styles from './FancyButton.module.css';

const classes = classer( styles );

const FancyButton = React.forwardRef( ( props, ref ) => {
  const { children, className, ...rest } = props;
  return (
    <button {...classes( 'btn', className )} {...rest} ref={ref}>
      {children}
    </button>
  );
} );

export default FancyButton;
