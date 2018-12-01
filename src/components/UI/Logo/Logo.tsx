import React, { FunctionComponent } from 'react';
import logo from './../../../assets/images/26.1 burger-logo.png.png';
import logolow from '../../../assets/images/26.1 burger-logo.png';
import styles from './Logo.module.css';

/**@export
 * @interface ILogoProps*/
export interface ILogoProps {
  /** @type {string}
   * @memberof ILogoProps*/
  link: string;
  /** @type {string}
   * @memberof ILogoProps*/
  height?: string;
  /** @type {boolean}
   * @memberof ILogoProps */
  HQ?: boolean;
}

/** Site Logo
 * @implements {ILogoProps} */
const Logo: FunctionComponent<ILogoProps> = ( { link, height = '', HQ = false } ) => (
  <a href={link} className={styles.Logo} style={{ height }}>
    <img src={HQ ? logo : logolow} alt="A Burger Logo" />
  </a>
);

export default Logo;
