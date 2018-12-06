import React, { FunctionComponent, MouseEventHandler } from 'react';
import styles from './BuildControl.module.css';

export interface IBuildControlProps {
  removed: MouseEventHandler;
  disabled: boolean;
  label: string;
  added: MouseEventHandler;
}
const BuildControl: FunctionComponent<IBuildControlProps> = ({
  added,
  disabled,
  label,
  removed
}) => {
  return (
    <div className={styles.BuildControl}>
      <div className={styles.Label}>{label}</div>
      <button onClick={removed} className={styles.Less} disabled={disabled}>
        Less
      </button>
      <button onClick={added} className={styles.More}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
