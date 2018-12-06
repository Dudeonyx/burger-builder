import React, { MouseEventHandler } from 'react';
import styles from './Button.module.css';

/** @export
 * @interface IButtonProps
 */
export interface IButtonProps {
  /**
   * @type {string}
   * @memberof IButtonProps
   */
  className?: string;
  /**
   * @type {'Danger' | 'Success' | ''}
   * @default ''
   * @memberof IButtonProps
   */
  type: 'Danger' | 'Success' | '';

  /**@type {MouseEventHandler}
   * @memberof IButtonProps
   */
  onClick: MouseEventHandler;
  children: string;
}
/**
 *  Custom button that forwards ref
 * @implements {IButtonProps}
 * @export
 */
const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, className, type = '', ...rest }, ref) => {
    return (
      <button
        className={[className, styles.Button, styles[type]].join(' ')}
        {...rest}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
