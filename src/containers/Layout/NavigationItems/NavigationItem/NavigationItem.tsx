import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavigationItem.module.css';

/** @export
 * @interface INavigationItem
 */
export interface INavigationItemProps {
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
 *  @param {INavigationItemProps} {
 *   exact,
 *   link,
 *   linkName
 * }
 */
const NavigationItem: FunctionComponent<INavigationItemProps> = ({
  exact,
  link,
  linkName
}: INavigationItemProps) => (
  <li className={styles.NavigationItem}>
    <NavLink to={link} exact={exact} activeClassName={styles.active}>
      <span>{linkName}</span>
    </NavLink>
  </li>
);

export default NavigationItem;
