import React, { Component, lazy } from 'react';

import { AxiosResponse } from 'axios';
import axios from '../../axios-orders';
import Retry from '../../components/Retry/Retry';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../HOCs/withErrorHandler';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { connect } from 'react-redux';
import Modal from '../../components/UI/Modal/Modal';
import { IBurgerBuilderState } from './types';
import { Iingredients } from '../../types/ingredients';
import {
  ingredientIncreaseHandler,
  ingredientDecreaseHandler,
  ingredientSetHandler,
  fetchIngredientsHandler,
} from '../../store/reducers/actions';
import { GetConnectProps } from '../../store/types';
import { RouteComponentProps } from 'react-router';
import { Dispatch, bindActionCreators } from 'redux';
import { IingredientReducerAction } from '../../store/reducers/ingredientReducer/types';
import { getIngredientState } from '../../store/selectors/selectors';

const BurgerDisplay = lazy(() =>
  import(/* webpackChunkName: "BurgerDisplay", webpackPrefetch: true */
  '../../components/Burger/BurgerDisplay/BurgerDisplay'),
);

const OrderSummary = lazy(() =>
  import(/* webpackChunkName: "OrderSummary", webpackPrefetch: true */ '../../components/OrderSummary/OrderSummary'),
);

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
    this.props.history.push({
      pathname: '/checkout',
    });
  };

  public render() {
    let burger = this.props.error ? (
      <Retry
        retryHandler={this.props.fetchIngredientsHandler}
        mainMessage="Ingredients Failed To Load. Please "
        additionalMessage={
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={this.offline}
          >
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

const mapBurgerBuilderDispatchToProps = {
  ingredientIncreaseHandler,
  ingredientDecreaseHandler,
  ingredientSetHandler,
  fetchIngredientsHandler,
};

const connectBurgerBuilder = connect(
  getIngredientState,
  mapBurgerBuilderDispatchToProps,
);
export type IBurgerBuilderProps = RouteComponentProps &
  GetConnectProps<typeof connectBurgerBuilder>;
export default connectBurgerBuilder(withErrorHandler(BurgerBuilder, axios));
