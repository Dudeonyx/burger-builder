import React, { Component, lazy } from 'react';

import { AxiosResponse } from 'axios';
import axios from '../../axios-orders';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../HOCs/withErrorHandler';

const BurgerDisplay = lazy(() =>
  import(/* webpackChunkName: "BurgerDisplay", webpackPreload: true */
  '../../components/Burger/BurgerDisplay/BurgerDisplay')
);
const BuildControls = lazy(() =>
  import(/* webpackChunkName: "BuildControls", webpackPreload: true */
  '../../components/Burger/BuildControls/BuildControls')
);
const Modal = lazy(() =>
  import(/* webpackChunkName: "Modal" */ '../../components/UI/Modal/Modal')
);
const OrderSummary = lazy(() =>
  import(/* webpackChunkName: "OrderSummary" */ '../../components/OrderSummary/OrderSummary')
);

const INGREDIENT_PRICES = {
  salad: 0.5,
  // tslint:disable-next-line:object-literal-sort-keys
  cheese: 0.6,
  bacon: 0.8,
  meat: 1.4
};
export interface Iingredients {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
}
export interface IBurgerBuilderState {
  ingredients: Iingredients | null;
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
  loading: boolean;
  orders: string[];
  error: Error | null | false;
}

class BurgerBuilder extends Component<{}, IBurgerBuilderState> {
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
  public updatePurchasable = (ingredients: Iingredients): boolean => {
    return Object.values(ingredients).some(igVal => igVal !== 0);
  };

  public ingredientIncreaseHandler = (type: keyof Iingredients): void => {
    if (!this.state.ingredients) {
      return;
    }
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] += 1;
    const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: newIngredients,
      purchasable: this.updatePurchasable(newIngredients),
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
    const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: newIngredients,
      purchasable: this.updatePurchasable(newIngredients),
      totalPrice: newTotalPrice
    });
  };

  public purchaseStartHandler = () => {
    this.setState({ purchasing: true });
  };
  public purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  public purchaseContinueHandler = async () => {
    try {
      this.setState({ loading: true });
      const order = this.generateOrder();
      const response = await axios.post('/orders.json', order);
      // tslint:disable-next-line:no-console
      console.log(response);
      const orders = this.state.orders.concat(response.data.name);
      this.setState({ orders });
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
    } finally {
      this.setState({ purchasing: false, loading: false });
    }
  };

  public render() {
    let burger = this.state.error ? (
      <p>
        Ingredients failed to load. Please{' '}
        <span
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={this.fetchIngredients}
        >
          retry?
        </span>{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={this.offline}
        >
          work offline for now?
        </span>
      </p>
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
            price={this.state.totalPrice}
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

  private generateOrder() {
    /*  tslint:disable:object-literal-sort-keys */
    return {
      customer: {
        name: 'OnyekaChukwu',
        address: {
          street: 'Adjenughure Street',
          city: 'Effural',
          state: 'Selta',
          country: 'Nier'
        },
        phone: '123-255-8416',
        areaCode: '+56',
        email: 'test@testing.on'
      },
      deliveryMethod: 'cheapest',
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      date: Date()
    };
    /*  tslint:enable:object-literal-sort-keys */
  }

  private fetchIngredients = async () => {
    this.setState({ error: null });
    try {
      const response: AxiosResponse<Iingredients> = await axios.get(
        '/ingredients.json'
      );
      this.setState({
        ingredients: response.data,
        purchasable: this.updatePurchasable(response.data)
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
      }
    });
  };
}

export default withErrorHandler(BurgerBuilder, axios);
