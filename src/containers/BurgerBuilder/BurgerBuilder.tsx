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
} from '../../store/actions';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import produce from 'immer';
import { connect } from 'react-redux';
import Modal from '../../components/UI/Modal/Modal';
import { IBurgerBuilderProps, IBurgerBuilderState } from './types';
import { Iingredients } from '../../types/ingredients';
// const immer = import(/* webpackChunkName: "immer" */ 'immer');

const BurgerDisplay = lazy(() =>
  import(/* webpackChunkName: "BurgerDisplay" */
  '../../components/Burger/BurgerDisplay/BurgerDisplay'),
);
// const BuildControls = lazy(() =>
//   import(/* webpackChunkName: "BuildControls" */
//   '../../components/Burger/BuildControls/BuildControls'),
// );
// const Modal = lazy(() =>
//   import(/* webpackChunkName: "Modal" */ '../../components/UI/Modal/Modal'),
// );
const OrderSummary = lazy(() =>
  import(/* webpackChunkName: "OrderSummary" */ '../../components/OrderSummary/OrderSummary'),
);

/**
 * @class BurgerBuilder
 * @extends {Component<IconnectIngredientsProps<RouteComponentProps>, IBurgerBuilderState>}
 */
class BurgerBuilder extends Component<
  IBurgerBuilderProps,
  IBurgerBuilderState
> {
  /*  tslint:disable:object-literal-sort-keys */
  public state: IBurgerBuilderState = {
    purchasable: false,
    purchasing: false,
    loading: false,
    orders: [],
    error: null,
  };
  /*  tslint:enable:object-literal-sort-keys */
  /**
   * componentDidMount
   */
  public componentDidMount() {
    this.fetchIngredients();
  }

  public componentDidUpdate(
    prevProps: IBurgerBuilderProps,
    prevState: IBurgerBuilderState,
  ) {
    if (!this.props.ingredients) {
      return;
    }
    const nextState = produce(this.state, draft => {
      // if (!draft.ingredients || draft.ingredients[type] <= 0) {
      //   return draft;
      // }
      draft.purchasable = updatePurchasable(this.props.ingredients!);
    });
    if (nextState.purchasable !== prevState.purchasable) {
      this.setState(nextState);
    }
  }

  public ingredientIncreaseHandler = async (type: keyof Iingredients) => {
    if (!this.props.ingredients) {
      return;
    }
    await this.props.ingredientIncreaseHandler(type);
    // const produce = (await immer).default;
    const nextState = produce(this.state, draft => {
      draft.purchasable = updatePurchasable(this.props.ingredients!);
    });
    this.setState(nextState);
  };
  public ingredientDecreaseHandler = async (type: keyof Iingredients) => {
    if (!this.props.ingredients) {
      return;
    }
    await this.props.ingredientDecreaseHandler(type);
    // const produce = (await immer).default;
    const nextState = produce(this.state, draft => {
      // if (!draft.ingredients || draft.ingredients[type] <= 0) {
      //   return draft;
      // }
      draft.purchasable = updatePurchasable(this.props.ingredients!);
    });
    this.setState(nextState);
  };

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
    // const newQueryString = (Object.entries(this.props.ingredients) as Array<
    //   [keyof Iingredients, number]
    // >)
    //   .map(([igKey, igVal,]) => `${encodeURIComponent(igKey)}=${igVal}`)
    //   .join('&');

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
            price={this.props.totalPrice!}
            increase={this.ingredientIncreaseHandler}
            decrease={this.ingredientDecreaseHandler}
            purchasable={this.state.purchasable}
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

    // if (this.state.loading) {
    //   orderSummary = <Loader />;
    // }
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
