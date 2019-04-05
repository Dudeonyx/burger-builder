import React, { FunctionComponent, useContext } from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import { AuthContext } from '../../App/App';
import styled from '@emotion/styled';

const NavigationItems: FunctionComponent = () => {
  const isAuth = useContext(AuthContext);

  const navElements = (
    <>
      <NavigationItem link="/" linkName="BurgerBuilder" exact={true} />
      {isAuth ? (
        <>
          <NavigationItem link="/all-orders" linkName="My Orders" exact={true} />
          <NavigationItem link="/logout" linkName="Logout" exact={true} />
        </>
      ) : (
        <NavigationItem link="/login" linkName="Login/SignUp" exact={true} />
      )}
    </>
  );
  return <StyledNavigationItems className="NavigationItems">{navElements}</StyledNavigationItems>;
};

const StyledNavigationItems = styled.ul`
  & {
    display: flex;
    align-items: center;
    flex-flow: row wrap;
    /* justify-content: stretch; */
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100%;
  }

  @media (min-width: 500px) {
    & {
      flex-flow: row nowrap;
    }
  }
`;

export default NavigationItems;
