import React, { Component, lazy } from 'react';

import axios from '../../axios-orders';
import Retry from '../../components/Retry/Retry';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../HOCs/withErrorHandler';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { connect } from 'react-redux';
import Modal from '../../components/UI/Modal/Modal';
import { IBurgerBuilderState } from './types/';
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
  selectIngredients,
  getPurchaseableFromStore,
  getTotalPriceFromStore,
  getAuthenticated,
} from '../../store/selectors/selectors';

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
class BurgerBuilder extends Component<
  IBurgerBuilderProps,
  IBurgerBuilderState
> {
  public state: IBurgerBuilderState = {
    purchasing: false,
  };

  public async componentDidMount() {
    this.props.setAuthRedirectUrl('/');
    this.props.ingredientSetHandler(null);
    this.props.fetchIngredientsHandler();
    setTimeout(() => {
      import(/* webpackChunkName: "Checkout" */ '../Checkout/Checkout');
    }, 10000);
  }

  public purchaseStartHandler = () => {
    import(/* webpackChunkName: "Checkout" */ '../Checkout/Checkout');
    this.setState({ purchasing: true });
  };
  public purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  public purchaseContinueHandler = () => {
    if (!this.props.ingredients) {
      return;
    }
    this.setState({ purchasing: false });
    if (this.props.isAuth) {
      this.props.history.push({
        pathname: '/checkout',
      });
    } else {
      this.props.setAuthRedirectUrl('/checkout');
      this.props.history.push('/login');
    }
  };

  public render() {
    let burger = this.props.error ? (
      <Retry
        retryHandler={this.props.fetchIngredientsHandler}
        mainMessage="Ingredients Failed To Load. Please "
        additionalMessage={
          <span style={offlineStyle} onClick={this.offline}>
            work offline for now?
          </span>
        }
      />
    ) : (
      <Loader />
    );

    let orderSummary = null;

    if (this.props.ingredients) {
      burger = (
        <>
          <React.Suspense fallback={<Loader />}>
            <BurgerDisplay ingredients={this.props.ingredients} />
          </React.Suspense>
          <BuildControls
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
            increase={this.props.ingredientIncreaseHandler}
            decrease={this.props.ingredientDecreaseHandler}
            purchaseable={this.props.purchaseable}
            purchaseStart={this.purchaseStartHandler}
          />
        </>
      );

      orderSummary = (
        <React.Suspense fallback={<Loader />}>
          <OrderSummary
            ingredients={this.props.ingredients}
            totalCost={this.props.totalPrice}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
            isAuth={this.props.isAuth}
          />
        </React.Suspense>
      );
    }

    return (
      <>
        <Modal show={this.state.purchasing} hider={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }

  private offline = () => {
    this.props.ingredientSetHandler({
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0,
    });
  };
}

const mapBurgerBuilderStateToProps = (state: IStore) => ({
  error: selectIngredientsError(state),
  ingredients: selectIngredients(state),
  purchaseable: getPurchaseableFromStore(state),
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

const connectBurgerBuilder = connect(
  mapBurgerBuilderStateToProps,
  mapBurgerBuilderDispatchToProps,
);
export type IBurgerBuilderProps = RouteComponentProps &
  GetConnectProps<typeof connectBurgerBuilder>;
export default connectBurgerBuilder(withErrorHandler(BurgerBuilder, axios));
