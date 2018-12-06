import { updatePurchasable } from '../../shared';
import React, { Component, lazy } from 'react';

import { AxiosResponse } from 'axios';
import { RouteComponentProps } from 'react-router';
import axios from '../../axios-orders';
import Retry from '../../components/Retry';
import Loader from '../../components/UI/Loader';
import withErrorHandler from '../../HOCs/withErrorHandler';
import { getTotalPrice } from '../../shared';

const BurgerDisplay = lazy(() =>
  import(/* webpackChunkName: "BurgerDisplay", webpackPrefetch: true */
  '../../components/Burger/BurgerDisplay')
);
const BuildControls = lazy(() =>
  import(/* webpackChunkName: "BuildControls", webpackPrefetch: true */
  '../../components/Burger/BuildControls')
);
const Modal = lazy(() =>
  import(/* webpackChunkName: "Modal" */ '../../components/UI/Modal')
);
const OrderSummary = lazy(() =>
  import(/* webpackChunkName: "OrderSummary" */ '../../components/OrderSummary')
);

/**
 * @export
 * @interface Iingredients
 */
export interface Iingredients {
  /**
   * @type {number}
   * @memberof Iingredients
   */
  salad: number;
  /**
   * @type {number}
   * @memberof Iingredients
   */
  bacon: number;
  /**
   * @type {number}
   * @memberof Iingredients
   */
  cheese: number;
  /**
   * @type {number}
   * @memberof Iingredients
   */
  meat: number;
}
/**
 * @export
 * @interface IBurgerBuilderState
 */
export interface IBurgerBuilderState {
  /**
   * @type {(Iingredients | null)}
   * @memberof IBurgerBuilderState
   */
  ingredients: Iingredients | null;
  /**
   * @type {number}
   * @memberof IBurgerBuilderState
   */
  totalPrice: number;
  /**
   * @type {boolean}
   * @memberof IBurgerBuilderState
   */
  purchasable: boolean;
  /**
   * @type {boolean}
   * @memberof IBurgerBuilderState
   */
  purchasing: boolean;
  /**
   * @type {boolean}
   * @memberof IBurgerBuilderState
   */
  loading: boolean;
  /**
   * @type {string[]}
   * @memberof IBurgerBuilderState
   */
  orders: string[];
  /**
   * @type {(Error | null | false)}
   * @memberof IBurgerBuilderState
   */
  error: Error | null | false;
}

/**
 * A burger display and controls container
 * @class BurgerBuilder
 * @extends {Component<{}, IBurgerBuilderState>}
 */
class BurgerBuilder extends Component<
  RouteComponentProps,
  IBurgerBuilderState
> {
  /*  tslint:disable:object-literal-sort-keys */
  public state: IBurgerBuilderState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    orders: [],
    error: null
  };
  /*  tslint:enable:object-literal-sort-keys */
  /**
   * componentDidMount
   */
  public componentDidMount() {
    this.fetchIngredients();
  }

  public ingredientIncreaseHandler = (type: keyof Iingredients): void => {
    if (!this.state.ingredients) {
      return;
    }
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] += 1;
    const newTotalPrice = getTotalPrice(newIngredients);
    this.setState({
      ingredients: newIngredients,
      purchasable: updatePurchasable(newIngredients),
      totalPrice: newTotalPrice
    });
  };
  public ingredientDecreaseHandler = (type: keyof Iingredients) => {
    if (!this.state.ingredients) {
      return;
    }
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] -= 1;
    const newTotalPrice = getTotalPrice(newIngredients);
    this.setState({
      ingredients: newIngredients,
      purchasable: updatePurchasable(newIngredients),
      totalPrice: newTotalPrice
    });
  };

  public purchaseStartHandler = () => {
    this.setState({ purchasing: true });
  };
  public purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  public purchaseContinueHandler = () => {
    if (!this.state.ingredients) {
      return;
    }
    const newQueryString = (Object.entries(this.state.ingredients) as Array<
      [keyof Iingredients, number]
    >)
      .map(([igKey, igVal]) => `${encodeURIComponent(igKey)}=${igVal}`)
      .join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + newQueryString
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

    if (this.state.ingredients) {
      burger = (
        <>
          <React.Suspense fallback={<Loader />}>
            <BurgerDisplay ingredients={this.state.ingredients} />
          </React.Suspense>
          <React.Suspense fallback={<Loader />}>
            <BuildControls
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              increase={this.ingredientIncreaseHandler}
              decrease={this.ingredientDecreaseHandler}
              purchasable={this.state.purchasable}
              purchaseStart={this.purchaseStartHandler}
            />
          </React.Suspense>
        </>
      );

      orderSummary = (
        <React.Suspense fallback={<Loader />}>
          <OrderSummary
            ingredients={this.state.ingredients}
            totalCost={this.state.totalPrice}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
          />
        </React.Suspense>
      );
    }

    if (this.state.loading) {
      orderSummary = <Loader />;
    }
    return (
      <React.Suspense fallback={<Loader />}>
        <Modal show={this.state.purchasing} hider={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Suspense>
    );
  }

  private fetchIngredients = async () => {
    this.setState({ error: null });
    try {
      const response: AxiosResponse<Iingredients> = await axios.get(
        '/ingredients.json'
      );
      const { data: newIngredients } = response;
      const newTotalPrice = getTotalPrice(newIngredients);
      this.setState({
        ingredients: newIngredients,
        purchasable: updatePurchasable(newIngredients),
        totalPrice: newTotalPrice
      });
    } catch (error) {
      // tslint:disable-next-line:no-console
      this.setState({
        error
      });
    }
  };
  private offline = () => {
    this.setState({
      error: false,
      ingredients: {
        bacon: 0,
        cheese: 0,
        meat: 0,
        salad: 0
      },
      totalPrice: 4
    });
  };
}

export default withErrorHandler(BurgerBuilder, axios);
