import React, { FunctionComponent } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navItems = [
  { url: '/', name: 'BurgerBuilder', exact: true },
  { url: '/checkout', name: 'Checkout', exact: false }
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
