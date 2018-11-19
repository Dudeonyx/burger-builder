import React from 'react';
import styles from './BuildControl.module.css';
import classer from 'react-classer';

const classes = classer( styles );

const buildControl = props => {
  return (
    <div {...classes( 'BuildControl' )}>
      <div {...classes( 'Label' )}>{props.label}</div>
      <button
        onClick={props.removed}
        {...classes( 'Less' )}
        disabled={props.disabled}
      >
        Less
      </button>
      <button onClick={props.added} {...classes( 'More' )}>
        More
      </button>
    </div>
  );
};

export default buildControl;
