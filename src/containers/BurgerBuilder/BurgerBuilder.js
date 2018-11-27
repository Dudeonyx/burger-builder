import React, { Component } from 'react';
import BurgerDisplay from '../../components/Burger/BurgerDisplay/BurgerDisplay';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.6,
  bacon: 0.8,
  meat: 1.4,
};
export default class BurgerBuilder extends Component {
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
  };

  updatePurchasable = ingredients => {
    const status = Object.values( ingredients ).some( igVal => igVal !== 0 );
    this.setState( {
      purchasable: status,
    } );
  };

  ingredientIncreaseHandler = type => {
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] += 1;
    let newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState( {
      ingredients: newIngredients,
      totalPrice: newTotalPrice,
    } );
    this.updatePurchasable( newIngredients );
  };
  ingredientDecreaseHandler = type => {
    if ( this.state.ingredients[type] <= 0 ) return;
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type] -= 1;
    let newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState( {
      ingredients: newIngredients,
      totalPrice: newTotalPrice,
    } );
    this.updatePurchasable( newIngredients );
  };

  purchaseStartHandler = () => {
    this.setState( { purchasing: true } );
  };
  purchaseCancelHandler = () => {
    this.setState( { purchasing: false } );
  };
  purchaseContinueHandler = async () => {
    const orders = {
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
      delivery: 'cheapest',
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
    };
    try {
      const response = axios.post( '/orders.json', orders );
      console.log( response );
      this.setState( { purchasing: false } );
      setImmediate( () => alert( 'You Ordered!!!' ) );
    } catch ( error ) {
      console.log( error );
    }
  };

  render() {
    return (
      <>
        <Modal show={this.state.purchasing} hider={this.purchaseCancelHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}
          />
        </Modal>
        <BurgerDisplay ingredients={this.state.ingredients} />
        <BuildControls
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          increase={this.ingredientIncreaseHandler}
          decrease={this.ingredientDecreaseHandler}
          purchasable={this.state.purchasable}
          purchaseStart={this.purchaseStartHandler}
        />
      </>
    );
  }
}
