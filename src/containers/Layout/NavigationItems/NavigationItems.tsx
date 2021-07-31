import { FunctionComponent } from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
// import { AuthContext } from '../../App/App';
import styled from "@emotion/styled";
import { useRedux } from "../../../shared/CustomHooks";
// import { Store } from 'redux';
import { getAuthenticated } from "../../../store/selectors";
import { Store } from "../../../store";

const NavigationItems: FunctionComponent = () => {
  // const isAuth = useContext(AuthContext);
  const [{ isAuth }] = useRedux((state: Store) => ({
    // ingredients: selectIngredients(state),
    // totalPrice: getTotalPriceFromStore(state),
    isAuth: getAuthenticated(state),
  }));

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
        <>
          <NavigationItem link="/login" linkName="Login/SignUp" exact={true} />
        </>
      )}
      <NavigationItem link="/page" linkName="" exact={true} />
    </>
  );
  return (
    <StyledNavigationItems className="NavigationItems">
      {navElements}
    </StyledNavigationItems>
  );
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
