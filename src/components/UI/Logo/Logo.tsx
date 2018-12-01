import React, { FunctionComponent, Suspense } from 'react';
import { Img } from 'the-platform/Img';
import logolow from '../../../assets/images/26.1 burger-logo.png';
import logo from './../../../assets/images/26.1 burger-logo.png.png';
import styles from './Logo.module.css';

/** @export
 * @interface ILogoProps
 */
export interface ILogoProps {
  /** @type {string}
   * @memberof ILogoProps
   */
  link: string;
  /** @type {string}
   * @memberof ILogoProps
   */
  height?: string;
  /** @type {boolean}
   * @memberof ILogoProps
   */
  HQ?: boolean;
}

/** Site Logo
 * @implements {ILogoProps}
 */
const Logo: FunctionComponent<ILogoProps> = ({
  link,
  height = '',
  HQ = false,
}) =>
  HQ ? (
    <Suspense
      // tslint:disable-next-line:jsx-no-multiline-js
      fallback={
        <a href={link} className={styles.Logo} style={{ height }}>
          <img src={logolow} alt="A Burger Logo" />
        </a>
      }
    >
      <a href={link} className={styles.Logo} style={{ height }}>
        <Img src={logo} alt="A Burger Logo" />
      </a>
    </Suspense>
  ) : (
    <a href={link} className={styles.Logo} style={{ height }}>
      <img src={logolow} alt="A Burger Logo" />
    </a>
  );

export default Logo;
