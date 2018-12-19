import { MouseEventHandler } from 'react';
/** @interface */
export interface IModalProps {
  /** A boolean indicating visibility of the modal
   * @default false
   */
  show: boolean;
  /** An event handler that sets "show" to false
   * @default "() => {}"
   */
  hider: MouseEventHandler;
  /**
   * @type {string}
   * @memberof IModal
   */
  bgColor?: string;
  /**
   * @type {number}
   * @memberof IModal
   */
  minWidth?: number;
}
export interface IStyledModal {
  bgColor?: string;
  show: boolean;
  minWidth?: number;
}
