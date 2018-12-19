import { updatePurchasable } from '../../shared/updatePurchasable';
import React, { Component, lazy } from 'react';

import { AxiosResponse } from 'axios';
import axios from '../../axios-orders';
import Retry from '../../components/Retry/Retry';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../HOCs/withErrorHandler';
import {
  ingredientIncreaseHandler,
  ingredientDecreaseHandler,
  ingredientStoreHandler,
  mapIngredientsStateToProps,
} from '../../store/reducers/ingredientReducer/actions';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import { connect } from 'react-redux';
import Modal from '../../components/UI/Modal/Modal';
import { IBurgerBuilderProps, IBurgerBuilderState } from './types';
import { Iingredients } from '../../types/ingredients';

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
    loading: false,
    orders: [],
    error: null,
  };

  public componentDidMount() {
    this.props.ingredientStoreHandler(null);
    this.fetchIngredients();
  }

  public purchaseStartHandler = () => {
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
      // search: '?' + newQueryString,
    });
  };

  public render() {
    let burger = this.state.error ? (
      <Retry
        retryHandler={this.fetchIngredients}
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
            purchasable={updatePurchasable(this.props.ingredients)}
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

  private fetchIngredients = async () => {
    this.setState({ error: null });
    try {
      const response: AxiosResponse<Iingredients> = await axios.get(
        '/ingredients.json',
      );
      const { data: newIngredients } = response;
      this.props.ingredientStoreHandler(newIngredients);
    } catch (error) {
      // tslint:disable-next-line:no-console
      this.setState({
        error,
      });
    }
  };
  private offline = () => {
    this.setState(
      () => ({ error: false }),
      () =>
        this.props.ingredientStoreHandler({
          bacon: 0,
          cheese: 0,
          meat: 0,
          salad: 0,
        }),
    );
  };
}

const mapDispatch = () => ({
  ingredientIncreaseHandler,
  ingredientDecreaseHandler,
  ingredientStoreHandler,
});

export default connect(
  mapIngredientsStateToProps,
  mapDispatch,
)(withErrorHandler(BurgerBuilder, axios));
