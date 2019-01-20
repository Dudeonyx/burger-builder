import React, {
  MouseEventHandler,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';
import styled from '@emotion/styled/macro';

const StyledButton = styled.button`
  & {
    background-color: transparent;
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
    font: inherit;
    padding: 10px;
    margin: 10px;
    font-weight: bold;
  }

  &:first-of-type {
    margin-left: 0;
    padding-left: 0;
  }

  &.Success {
    color: #5c9210;
  }

  &.Danger {
    color: #944317;
  }

  &:disabled {
    color: darkgray;
    cursor: not-allowed;
  }
`;

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

  /**
   * Same as default button `type` prop
   *
   * @type {('submit' | 'reset' | 'button')}
   * @memberof IButtonProps
   */
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
  ({ className, btnType = '', ...rest }, ref) => {
    return (
      <StyledButton
        className={[className, btnType,].join(' ')}
        {...rest}
        ref={ref}
      />
    );
  },
);

export default Button;
