import React, { lazy, FC, useState, useEffect, useCallback, useContext } from 'react';

import axios from '../../axios-orders';
import Retry from '../../components/Retry/Retry';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../HOCs/withErrorHandler';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { connect } from 'react-redux';
import Modal from '../../components/UI/Modal/Modal';
import {
  fetchIngredientsHandler,
  decreaseIngredient,
  increaseIngredient,
  setIngredients,
  setAuthRedirectUrl,
} from '../../store/actions';
import { GetConnectProps, IStore } from '../../store/';
import { RouteComponentProps } from 'react-router';
import {
  selectIngredientsError,
  getPurchaseableFromStore,
  getTotalPriceFromStore,
} from '../../store/selectors/selectors';
import { AuthContext, IngredientsContext } from '../App/App';

const BurgerDisplay = lazy(() =>
  import(/* webpackChunkName: "BurgerDisplay", webpackPrefetch: true */
  '../../components/Burger/BurgerDisplay/BurgerDisplay'),
);

const OrderSummary = lazy(() =>
  import(/* webpackChunkName: "OrderSummary", webpackPrefetch: true */ '../../components/OrderSummary/OrderSummary'),
);

const offlineStyle = { color: 'blue', cursor: 'pointer' };
/**
 * @class BurgerBuilder
 * @extends {Component<IconnectIngredientsProps<RouteComponentProps>, IBurgerBuilderState>}
 */
const BurgerBuilder: FC<IBurgerBuilderProps> = (props) => {
  const [purchasing, setPurchasing,] = useState(false);

  const isAuth = useContext(AuthContext);
  const {ingredients, totalPrice} = useContext(IngredientsContext)!;

  useEffect(() => {
    props.setAuthRedirectUrl('/');
    props.ingredientSetHandler(null);
    props.fetchIngredientsHandler();
    setTimeout(() => {
      import(/* webpackChunkName: "Checkout" */ '../Checkout/Checkout');
    }, 10000);
  },[])

  const purchaseStartHandler = useCallback(() => {
    import(/* webpackChunkName: "Checkout" */ '../Checkout/Checkout');
    setPurchasing(true);
  },[]);
  const purchaseCancelHandler = useCallback(() => {
    setPurchasing(false);
  },[]);
  const purchaseContinueHandler = useCallback(() => {
    if (!ingredients) {
      return;
    }
    setPurchasing(false);
    if (isAuth) {
      props.history.push({
        pathname: '/checkout',
      });
    } else {
      props.setAuthRedirectUrl('/checkout');
      props.history.push('/login');
    }
  },[]);

  const offline = useCallback(() => {
    props.ingredientSetHandler({
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0,
    });
  },[]);

    let burger = props.error ? (
      <Retry
        retryHandler={props.fetchIngredientsHandler}
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
          <React.Suspense fallback={<Loader />}>
            <BurgerDisplay ingredients={ingredients} />
          </React.Suspense>
          <BuildControls
            ingredients={ingredients}
            price={props.totalPrice}
            increase={props.ingredientIncreaseHandler}
            decrease={props.ingredientDecreaseHandler}
            purchaseable={props.purchaseable}
            purchaseStart={purchaseStartHandler}
          />
        </>
      );

      orderSummary = (
        <React.Suspense fallback={<Loader />}>
          <OrderSummary
            ingredients={ingredients}
            totalCost={props.totalPrice}
            purchaseCancel={purchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler}
            isAuth={isAuth}
          />
        </React.Suspense>
      );
    }

    return (
      <>
        <Modal show={purchasing} hider={purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  
}

const mapBurgerBuilderStateToProps = (state: IStore) => ({
  error: selectIngredientsError(state),
  purchaseable: getPurchaseableFromStore(state),
  totalPrice: getTotalPriceFromStore(state),
});

const mapBurgerBuilderDispatchToProps = {
  ingredientIncreaseHandler: increaseIngredient,
  ingredientDecreaseHandler: decreaseIngredient,
  ingredientSetHandler: setIngredients,
  fetchIngredientsHandler,
  setAuthRedirectUrl,
};

const connectBurgerBuilder = connect(
  mapBurgerBuilderStateToProps,
  mapBurgerBuilderDispatchToProps,
);
export type IBurgerBuilderProps = RouteComponentProps &
  GetConnectProps<typeof connectBurgerBuilder>;
export default connectBurgerBuilder(withErrorHandler(BurgerBuilder, axios));
