import React from 'react';
import styles from './Button.module.css';

const Button = React.forwardRef( ( props, ref ) => {
  const { children, className, type, ...rest } = props;
  return (
    <button
      className={[className, styles.Button, styles[type]].join( ' ' )}
      {...rest}
      ref={ref}
    >
      {children}
    </button>
  );
} );

export default Button;
