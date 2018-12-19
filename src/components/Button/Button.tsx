import React, {
  MouseEventHandler,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import styles from './Button.module.css';

/** @export
 * @interface IButtonProps
 */
export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  btnType?: 'Danger' | 'Success' | '';

  type?: 'submit' | 'reset' | 'button';

  /**@type {MouseEventHandler}
   * @memberof IButtonProps
   */
  onClick: MouseEventHandler;
  children: ReactNode;
}
/**
 *  Custom button that forwards ref
 * @implements {IButtonProps}
 * @export
 */
const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  ({ children, className, btnType = '', ...rest }, ref) => {
    return (
      <button
        className={[className, styles.Button, styles[btnType],].join(' ')}
        {...rest}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

export default Button;
