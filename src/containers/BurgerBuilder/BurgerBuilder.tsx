import { updatePurchasable } from '../../shared/updatePurchasable';
import React, { Component, lazy } from 'react';

import { AxiosResponse } from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import axios from '../../axios-orders';
import Retry from '../../components/Retry/Retry';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../HOCs/withErrorHandler';
import { getTotalPrice } from '../../shared/getTotalPrice';
import {
  connect,
  MapStateToPropsFactory,
  MapStateToProps,
  MapDispatchToPropsFunction,
} from 'react-redux';
import {
  IingredientReducerState,
  IingredientReducerAction,
} from '../../store/reducers/ingredientReducer';
import { ingredientActions } from '../../store/actions';
import { Dispatch, Action } from 'redux';
import { IingredientsKeys } from '../../components/Burger/BuildControls/BuildControls';
// import produce from 'immer';
const immer = import(/* webpackChunkName: "immer" */ 'immer');

const BurgerDisplay = lazy(() =>
  import(/* webpackChunkName: "BurgerDisplay" */
  '../../components/Burger/BurgerDisplay/BurgerDisplay'),
);
const BuildControls = lazy(() =>
  import(/* webpackChunkName: "BuildControls" */
  '../../components/Burger/BuildControls/BuildControls'),
);
const Modal = lazy(() =>
  import(/* webpackChunkName: "Modal" */ '../../components/UI/Modal/Modal'),
);
const OrderSummary = lazy(() =>
  import(/* webpackChunkName: "OrderSummary" */ '../../components/OrderSummary/OrderSummary'),
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
   * @type {string}
   * @memberof IBurgerBuilderState
   */
  totalPrice: string;
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
 * @extends {(Component<RouteComponentProps & IingredientReducerState, IBurgerBuilderState>)}
 */
class BurgerBuilder extends Component<
  RouteComponentProps & IingredientReducerState,
  IBurgerBuilderState
> {
  /*  tslint:disable:object-literal-sort-keys */
  public state: IBurgerBuilderState = {
    ingredients: null,
    totalPrice: '4',
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

  public ingredientIncreaseHandler = async (type: keyof Iingredients) => {
    if (!this.state.ingredients) {
      return;
    }
    const produce = (await immer).default;
    const nextState = produce(this.state, draft => {
      // if (!draft.ingredients || draft.ingredients[type] <= 0) {
      //   return draft;
      // }
      draft.ingredients![type] += 1;
      draft.totalPrice = getTotalPrice(draft.ingredients!);
      draft.purchasable = updatePurchasable(draft.ingredients!);
    });
    this.setState(nextState);
  };
  public ingredientDecreaseHandler = async (type: keyof Iingredients) => {
    if (!this.state.ingredients) {
      return;
    }
    const produce = (await immer).default;
    const nextState = produce(this.state, draft => {
      // if (!draft.ingredients || draft.ingredients[type] <= 0) {
      //   return draft;
      // }
      draft.ingredients![type] -= 1;
      draft.totalPrice = getTotalPrice(draft.ingredients!);
      draft.purchasable = updatePurchasable(draft.ingredients!);
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
    if (!this.state.ingredients) {
      return;
    }
    const newQueryString = (Object.entries(this.state.ingredients) as Array<
      [keyof Iingredients, number]
    >)
      .map(([igKey, igVal,]) => `${encodeURIComponent(igKey)}=${igVal}`)
      .join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + newQueryString,
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
        '/ingredients.json',
      );
      const { data: newIngredients } = response;
      const newTotalPrice = getTotalPrice(newIngredients);
      this.setState({
        ingredients: newIngredients,
        purchasable: updatePurchasable(newIngredients),
        totalPrice: newTotalPrice,
      });
    } catch (error) {
      // tslint:disable-next-line:no-console
      this.setState({
        error,
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
        salad: 0,
      },
      totalPrice: '4',
    });
  };
}

const mapStateToProps: MapStateToProps<
  IingredientReducerState,
  RouteComponentProps,
  IingredientReducerState
> = state => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
});

export interface ImapDispatch {
  ingredientIncreaseHandler: (
    igkey: IingredientsKeys,
  ) => IingredientReducerAction;
  ingredientDecreaseHandler: (
    igkey: IingredientsKeys,
  ) => IingredientReducerAction;
  ingredientStoreHandler: (
    ingredients: Iingredients,
  ) => IingredientReducerAction;
}
/**
 *
 *
 * @param {Dispatch<IingredientReducerAction>} dispatch
 */
const mapDispatchToProps: MapDispatchToPropsFunction<
  ImapDispatch,
  RouteComponentProps
> = (dispatch: Dispatch<IingredientReducerAction>) => ({
  ingredientIncreaseHandler: igkey =>
    dispatch({ type: ingredientActions.INCREASE, payload: { igkey } }),
  ingredientDecreaseHandler: igkey =>
    dispatch({ type: ingredientActions.DECREASE, payload: { igkey } }),
  ingredientStoreHandler: ingredients =>
    dispatch({ type: ingredientActions.STORE, payload: { ingredients } }),
});

type P = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps)(withErrorHandler(BurgerBuilder, axios));
