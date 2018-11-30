import React, { Component, lazy } from 'react';

import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios-orders';

const BurgerDisplay = lazy( () =>
  import( /* webpackChunkName: "BrgrDspl" */
  '../../components/Burger/BurgerDisplay/BurgerDisplay' ),
);
const BuildControls = lazy( () =>
  import( /* webpackChunkName: "BldCtrls" */
  '../../components/Burger/BuildControls/BuildControls' ),
);
const Modal = lazy(
  /* webpackChunkName: "Modal" */ () =>
    import( '../../components/UI/Modal/Modal' ),
);
const OrderSummary = lazy( () =>
  import( /* webpackChunkName: "OrdSmry" */ '../../components/OrderSummary/OrderSummary' ),
);

const INGREDIENT_PRICES = {
  salad: 0.5,
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
  state = {
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

  updatePurchasable = ( ingredients: Iingredients ) => {
    const status = Object.values( ingredients ).some( igVal => igVal !== 0 );
    this.setState( {
      purchasable: status,
    } );
  }

  ingredientIncreaseHandler = ( type: keyof Iingredients ): void => {
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] += 1;
    const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState( {
      ingredients: newIngredients,
      totalPrice: newTotalPrice,
    } );
    this.updatePurchasable( newIngredients );
  }
  ingredientDecreaseHandler = ( type: keyof Iingredients ) => {
    if ( this.state.ingredients[type] <= 0 ) return;
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] -= 1;
    const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState( {
      ingredients: newIngredients,
      totalPrice: newTotalPrice,
    } );
    this.updatePurchasable( newIngredients );
  }

  purchaseStartHandler = () => {
    this.setState( { purchasing: true } );
  }
  purchaseCancelHandler = () => {
    this.setState( { purchasing: false } );
  }
  purchaseContinueHandler = async () => {
    try {
      this.setState( { loading: true } );
      const order = this.generateOrder();
      const response = await axios.post( '/orders.json', order );
      console.log( response );
      this.setState( prevState => ( {
        orders: prevState.orders.concat( response.data.name ),
      } ) );
    } catch ( error ) {
      console.log( error );
    } finally {
      this.setState( { purchasing: false, loading: false } );
    }
  }

  generateOrder() {
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
      price: this.state.totalPrice,
    };
  }

  render() {
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
        <Modal show={this.state.purchasing} hider={this.purchaseCancelHandler}>
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
      </React.Suspense>
    );
  }
}

export default BurgerBuilder;
