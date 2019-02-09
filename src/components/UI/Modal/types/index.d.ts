import { MouseEventHandler } from 'react';
export interface IStyledModal {
  bgColor?: string;
  /** A boolean indicating visibility of the modal
   * @default false
   */
  show: boolean;
  /**
   * @type {number}
   * @memberof IStyledModal
   */
  minWidth?: number;
  /**
   * @type {number}
   * @memberof IStyledModal
   */
  zIndex?: number;
}
/** @interface */
export interface IModalProps extends IStyledModal {
  /** An event handler that sets "show" to false
   * @default "() => {}"
   */
  hider: MouseEventHandler;
  children?: React.ReactNode;
}
