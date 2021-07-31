import { lazy, FC, useState, useEffect, useCallback, Suspense } from "react";

import axios from "../../axios-orders";
import Retry from "../../components/Retry/Retry";
import Loader from "../../components/UI/Loader/Loader";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import {
  fetchIngredientsHandler,
  decreaseIngredient,
  increaseIngredient,
  setIngredients,
  setAuthRedirectUrl,
} from "../../store/actions";
import { Store } from "../../store/";
import { RouteComponentProps } from "react-router";
import {
  selectIngredientsError,
  getPurchaseableFromStore,
  selectIngredients,
  getTotalPriceFromStore,
  getAuthenticated,
} from "../../store/selectors/selectors";
// import { AuthContext } from '../App/App';
import { useAxiosErrorHandler, useRedux } from "../../shared/CustomHooks";

const BurgerDisplay = lazy(
  () =>
    import(
      /* webpackChunkName: "BurgerDisplay", webpackPrefetch: true */
      "../../components/Burger/BurgerDisplay/BurgerDisplay"
    )
);

const OrderSummary = lazy(
  () =>
    import(
      /* webpackChunkName: "OrderSummary", webpackPrefetch: true */ "../../components/OrderSummary/OrderSummary"
    )
);

const offlineStyle = { color: "blue", cursor: "pointer" };

const mapBurgerBuilderStateToProps = (state: Store) => ({
  error: selectIngredientsError(state),
  purchaseable: getPurchaseableFromStore(state),
  ingredients: selectIngredients(state),
  totalPrice: getTotalPriceFromStore(state),
  isAuth: getAuthenticated(state),
});

const mapBurgerBuilderDispatchToProps = {
  ingredientIncreaseHandler: increaseIngredient,
  ingredientDecreaseHandler: decreaseIngredient,
  ingredientSetHandler: setIngredients,
  fetchIngredientsHandler,
  setAuthRedirectUrl,
};

const BurgerBuilder: FC<BurgerBuilderProps> = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const axiosError = useAxiosErrorHandler(axios);

  // const isAuth = useContext(AuthContext);
  // const { totalPrice } = useContext(IngredientsContext);
  const [
    { isAuth, error, ingredients, purchaseable, totalPrice },
    {
      fetchIngredientsHandler,
      ingredientDecreaseHandler,
      ingredientIncreaseHandler,
      ingredientSetHandler,
      setAuthRedirectUrl,
    },
  ] = useRedux(mapBurgerBuilderStateToProps, mapBurgerBuilderDispatchToProps);

  useEffect(() => {
    setAuthRedirectUrl("/");
    ingredientSetHandler(null);
    fetchIngredientsHandler();
    setTimeout(() => {
      import(/* webpackChunkName: "Checkout" */ "../Checkout/Checkout");
    }, 10000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const purchaseStartHandler = useCallback(() => {
    import(/* webpackChunkName: "Checkout" */ "../Checkout/Checkout");
    setPurchasing(true);
  }, []);
  const purchaseCancelHandler = useCallback(() => {
    setPurchasing(false);
  }, []);
  const purchaseContinueHandler = useCallback(() => {
    if (!ingredients) {
      return;
    }
    setPurchasing(false);
    if (isAuth) {
      props.history.push({
        pathname: "/checkout",
      });
    } else {
      setAuthRedirectUrl("/checkout");
      props.history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients, isAuth]);

  const offline = useCallback(() => {
    ingredientSetHandler({
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let burger = error ? (
    <Retry
      retryHandler={fetchIngredientsHandler}
      mainMessage="Ingredients Failed To Load. Please "
      additionalMessage={
        <span style={offlineStyle} onClick={offline}>
          work offline for now?
        </span>
      }
    />
  ) : (
    <Loader />
  );

  let orderSummary = null;

  if (ingredients) {
    burger = (
      <>
        <Suspense fallback={<Loader />}>
          <BurgerDisplay ingredients={ingredients} />
        </Suspense>
        <BuildControls
          ingredients={ingredients}
          price={totalPrice}
          increase={ingredientIncreaseHandler}
          decrease={ingredientDecreaseHandler}
          purchaseable={purchaseable}
          purchaseStart={purchaseStartHandler}
        />
      </>
    );

    orderSummary = (
      <Suspense fallback={<Loader />}>
        <OrderSummary
          ingredients={ingredients}
          totalCost={totalPrice}
          purchaseCancel={purchaseCancelHandler}
          purchaseContinue={purchaseContinueHandler}
          isAuth={isAuth}
        />
      </Suspense>
    );
  }

  return (
    <>
      {axiosError}
      <Modal show={purchasing} hider={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>
  );
};

// const connectBurgerBuilder = connect(
//   mapBurgerBuilderStateToProps,
//   mapBurgerBuilderDispatchToProps,
// );
export type BurgerBuilderProps = RouteComponentProps; /* &
  GetConnectProps<typeof connectBurgerBuilder>; */
export default BurgerBuilder;
