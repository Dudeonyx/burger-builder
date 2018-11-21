import React, { Component } from 'react';
import Aux from '../../hocs/ax';
import BurgerDisplay from '../../components/Burger/BurgerDisplay/BurgerDisplay';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

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
  purchaseContinueHandler = () => {
    alert( 'You Ordered!!!' );
    this.setState( { purchasing: false } );
  };

  render() {
    const disabledCheck = {
      ...this.state.ingredients,
    };
    Object.entries( disabledCheck ).forEach( ( [key, value] ) => {
      disabledCheck[key] = value <= 0;
    } );

    return (
      <Aux>
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
      </Aux>
    );
  }
}