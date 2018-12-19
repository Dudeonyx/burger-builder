import React, { FunctionComponent } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navItems = [
  { url: '/', name: 'BurgerBuilder', exact: true },
  { url: '/all-orders', name: 'My Orders', exact: true },
  // { url: '/', name: 'About Us' },
];
// export interface INavigationItems {}
const NavigationItems: FunctionComponent<{}> = () => {
  const navElements = navItems.map(({ url, name, exact }) => (
    <NavigationItem key={name} link={url} linkName={name} exact={exact} />
  ));
  return <ul className={styles.NavigationItems}>{navElements}</ul>;
};

export default NavigationItems;
