import React, { FunctionComponent, Suspense } from 'react';
import { Link } from 'react-router-dom';
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
  HQ = false
}) =>
  HQ ? (
    <Suspense
      fallback={
        <Link to={link} className={styles.Logo} style={{ height }}>
          <img src={logolow} alt="A Burger Logo" />
        </Link>
      }
    >
      <Link to={link} className={styles.Logo} style={{ height }}>
        <Img src={logo} alt="A Burger Logo" />
      </Link>
    </Suspense>
  ) : (
    <Link to={link} className={styles.Logo} style={{ height }}>
      <img src={logolow} alt="A Burger Logo" />
    </Link>
  );

export default Logo;
