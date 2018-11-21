import React from 'react';
import styles from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
  const navItems = [
    { url: '/', name: 'BurgerBuilder' },
    { url: '/', name: 'Checkout' },
    { url: '/', name: 'About Us' },
  ];
  let current = 'BurgerBuilder';
  return (
    <ul className={styles.NavigationItems}>
      {navItems.map( ( { url, name } ) => (
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
