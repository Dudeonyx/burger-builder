import React, { FunctionComponent } from 'react';
import styles from './NavigationItem.module.css';

/** @export
 * @interface INavigationItem
 */
export interface INavigationItem {
  /** Indicative of the current page/route
   * @type {boolean}
   * @memberof INavigationItem
   */
  active: boolean;
  /** Link the nav item should point to
   * @type {string}
   * @memberof INavigationItem
   */
  link: string;
  /** Nav Name to display
   * @type {string}
   * @memberof INavigationItem
   */
  linkName: string;
}
/** Single nav item
 * @implements {INavigationItem}
 */
const NavigationItem: FunctionComponent<INavigationItem> = ( {
  active,
  link,
  linkName,
} ) => (
  <li className={styles.NavigationItem}>
    <a href={link} className={active ? styles.active : ''}>
      <span>{linkName}</span>
    </a>
  </li>
);

export default NavigationItem;
