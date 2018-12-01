import React, { FunctionComponent } from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

export interface INavigationItems {}
const NavigationItems: FunctionComponent<INavigationItems> = () => {
  const navItems = [
    { url: '/', name: 'BurgerBuilder' },
    { url: '/', name: 'Checkout' },
    { url: '/', name: 'About Us' },
  ];
  const current = 'BurgerBuilder';
  return (
    <ul className={styles.NavigationItems}>
      {navItems.map( ( { url, name } ) => (
        // tslint:disable-next-line:jsx-no-multiline-js
        <NavigationItem
          key={name}
          link={url}
          linkName={name}
          active={name === current ? true : false}
        />
      ) )}
    </ul>
  );
};

export default NavigationItems;
