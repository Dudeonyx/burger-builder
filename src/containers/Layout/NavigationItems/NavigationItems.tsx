import React, { FunctionComponent, useContext } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';
import { AuthContext } from '../../App/App';

const NavigationItems: FunctionComponent = () => {

  const isAuth = useContext(AuthContext);
  
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
        <NavigationItem link="/login" linkName="Login/SignUp" exact={true} />
      )}
    </>
  );
  return <ul className={styles.NavigationItems}>{navElements}</ul>;
};

export default NavigationItems;
