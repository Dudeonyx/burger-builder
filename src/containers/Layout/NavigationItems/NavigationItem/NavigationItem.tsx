import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled/macro';

/** @export
 * @interface INavigationItem
 */
export interface NavigationItemProps {
  /** Set if the url must be exact or not
   * @type {boolean}
   * @memberof INavigationItemProps
   */
  exact?: boolean;
  /** Link the nav item should point to
   * @type {string}
   * @memberof INavigationItemProps
   */
  link: string;
  /** Nav Name to display
   * @type {string}
   * @memberof INavigationItemProps
   */
  linkName: string;
}
/** Single nav item
 *  @param {NavigationItemProps} {
 *   exact,
 *   link,
 *   linkName
 * }
 */
const NavigationItem: FunctionComponent<NavigationItemProps> = ({
  exact,
  link,
  linkName,
}: NavigationItemProps) => (
  <StyledNavigationItem>
    <NavLink to={link} exact={exact} activeClassName="active">
      <span>{linkName}</span>
    </NavLink>
  </StyledNavigationItem>
);

const StyledNavigationItem = styled.li`
  & {
    flex: 1 1 100%;
    box-sizing: border-box;
    margin: 5px 1px;
    /* width: 100%; */
  }
  & a {
    text-decoration: none;
    box-sizing: border-box;
    color: chocolate;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & a:hover,
  & a:active,
  & a.active {
    color: lightseagreen;
  }

  @media (min-width: 500px) {
    & {
      flex: auto;
      box-sizing: border-box;
      height: 100%;
      width: auto;
      margin: 0px 1px;
    }
    & a {
      text-decoration: none;
      box-sizing: border-box;
      height: 100%;
      color: white;
      border-bottom: 2px solid transparent;
      padding: 10px 16px;
      display: flex;
      align-items: center;
    }

    & a:hover,
    & a:active,
    & a.active {
      border-bottom: 2px solid lightseagreen;
      color: unset;
      background-color: rgba(255, 255, 255, 0.192);
    }
  }
`;

export default NavigationItem;
