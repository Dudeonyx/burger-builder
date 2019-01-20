import React, { FunctionComponent, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Img } from 'the-platform/Img';
import logolow from '../../../assets/images/26.1 burger-logo.png';
import logo from './../../../assets/images/26.1 burger-logo.png.png';
import styled from '@emotion/styled/macro';

const StyledLogo = styled(Link)`
  & {
    height: ${({ height }: { height?: string }) => (height ? height : '90%')};
    padding: 1px;
    box-sizing: border-box;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: bisque;
    border-radius: 5px;
  }
  & img {
    height: 80%;
  }
`;

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
      fallback={
        <StyledLogo to={link} height={height}>
          <img src={logolow} alt="A Burger Logo" />
        </StyledLogo>
      }
    >
      <StyledLogo to={link} height={height}>
        <Img src={logo} alt="A Burger Logo" />
      </StyledLogo>
    </Suspense>
  ) : (
    <StyledLogo to={link} height={height}>
      <img src={logolow} alt="A Burger Logo" />
    </StyledLogo>
  );

export default Logo;
