import React, { FunctionComponent } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

// export interface INavigationItems {}
const NavigationItems: FunctionComponent<{}> = () => {
  const navItems = [
    { url: '/', name: 'BurgerBuilder' },
    { url: '/', name: 'Checkout' },
    { url: '/', name: 'About Us' },
  ];
  const current = 'BurgerBuilder';
  const navElements = navItems.map(({ url, name }) => (
    <NavigationItem
      key={name}
      link={url}
      linkName={name}
      active={name === current ? true : false}
    />
  ));
  return <ul className={styles.NavigationItems}>{navElements}</ul>;
};

export default React.memo(NavigationItems);
