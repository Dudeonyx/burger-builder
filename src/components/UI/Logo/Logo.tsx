import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import logolow from "../../../assets/images/26.1 burger-logo.png";
import logo from "./../../../assets/images/26.1 burger-logo.png.png";
import styled from "@emotion/styled/macro";

const StyledLogo = styled(Link)<{ height?: string }>`
  & {
    height: ${({ height }) => (height ? height : "90%")};
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
export interface LogoProps {
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
const Logo: FunctionComponent<LogoProps> = ({ link, height, HQ = false }) =>
  HQ ? (
    <StyledLogo to={link} height={height}>
      <img src={logo} alt="A Burger Logo" />
    </StyledLogo>
  ) : (
    <StyledLogo to={link} height={height}>
      <img src={logolow} alt="A Burger Logo" />
    </StyledLogo>
  );

export default Logo;
