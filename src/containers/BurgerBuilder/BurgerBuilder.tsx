import React, { Component, lazy } from 'react';

import axios from '../../axios-orders';
import Loader from '../../components/UI/Loader/Loader';
import AxiosErrorBoundary from '../../HOCs/AxiosErrorBoundary';

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

const INGREDIENT_PRICES = {
  salad: 0.5,
  // tslint:disable-next-line:object-literal-sort-keys
  cheese: 0.6,
  bacon: 0.8,
  meat: 1.4,
};
interface IBurgerBuilderState {
  ingredients: Iingredients;
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
  loading: boolean;
  orders: string[];
}
interface Iingredients {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
}
class BurgerBuilder extends Component<{}, IBurgerBuilderState> {
  /*  tslint:disable:object-literal-sort-keys */
  public state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    orders: [],
  };
  /*  tslint:enable:object-literal-sort-keys */

  public updatePurchasable = (ingredients: Iingredients) => {
    const status = Object.values(ingredients).some((igVal) => igVal !== 0);
    this.setState({
      purchasable: status,
    });
  }

  public ingredientIncreaseHandler = (type: keyof Iingredients): void => {
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] += 1;
    const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: newIngredients,
      totalPrice: newTotalPrice,
    });
    this.updatePurchasable(newIngredients);
  }
  public ingredientDecreaseHandler = (type: keyof Iingredients) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] -= 1;
    const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: newIngredients,
      totalPrice: newTotalPrice,
    });
    this.updatePurchasable(newIngredients);
  }

  public purchaseStartHandler = () => {
    this.setState({ purchasing: true });
  }
  public purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }
  public purchaseContinueHandler = async () => {
    try {
      this.setState({ loading: true });
      const order = this.generateOrder();
      const response = await axios.post('/orders', order);
      // tslint:disable-next-line:no-console
      console.log(response);
      this.setState((prevState) => ({
        orders: prevState.orders.concat(response.data.name),
      }));
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(error);
    } finally {
      this.setState({ purchasing: false, loading: false });
    }
  }

  public generateOrder() {
    /*  tslint:disable:object-literal-sort-keys */
    return {
      customer: {
        name: 'OnyekaChukwu',
        address: {
          street: 'Adjenughure Street',
          city: 'Effural',
          state: 'Selta',
          country: 'Nier',
        },
        phone: '123-255-8416',
        areaCode: '+56',
        email: 'test@testing.on',
      },
      deliveryMethod: 'cheapest',
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      date: Date(),
    };
    /*  tslint:enable:object-literal-sort-keys */
  }

  public render() {
    const orderSummary = this.state.loading ? (
      <Loader />
    ) : (
      <React.Suspense fallback={<Loader />}>
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      </React.Suspense>
    );
    return (
      <React.Suspense fallback={<Loader />}>
        <AxiosErrorBoundary axios={axios}>
          <Modal
            show={this.state.purchasing}
            hider={this.purchaseCancelHandler}
          >
            {orderSummary}
          </Modal>
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
        </AxiosErrorBoundary>
      </React.Suspense>
    );
  }
}

export default BurgerBuilder;
