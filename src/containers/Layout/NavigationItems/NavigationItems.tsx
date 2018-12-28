import React, { FunctionComponent } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const NavigationItems: FunctionComponent<{
  isAuth: boolean;
  pathName: string;
}> = ({ isAuth, pathName }) => {
  const path = pathName ? pathName.slice(1) : '';
  const redirect = '?redirect=' + path;
  const navElements = (
    <>
      <NavigationItem link="/" linkName="BurgerBuilder" exact={true} />
      {isAuth ? (
        <>
          <NavigationItem
            link="/all-orders"
            linkName="My Orders"
            exact={true}
          />
          <NavigationItem link="/logout" linkName="Logout" exact={true} />
        </>
      ) : (
        <NavigationItem
          link={'/login' + (!path.startsWith('login') ? redirect : '')}
          linkName="Login/SignUp"
          exact={true}
        />
      )}
    </>
  );
  return <ul className={styles.NavigationItems}>{navElements}</ul>;
};

export default NavigationItems;
