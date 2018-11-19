import React, { Component } from 'react';
import Aux from '../../hocs/ax';
import BurgerDisplay from '../../components/Burger/BurgerDisplay';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
  render() {
    const disabledCheck = {
      ...this.state.ingredients,
    };
    Object.entries( disabledCheck ).forEach( ( [key, value] ) => {
      disabledCheck[key] = value <= 0;
    } );
    return (
      <Aux>
        <div>
          <BurgerDisplay ingredients={this.state.ingredients} />
        </div>
        <BuildControls
          price={this.state.totalPrice}
          increase={this.ingredientIncreaseHandler}
          decrease={this.ingredientDecreaseHandler}
          disabledCheck={disabledCheck}
          purchasable={this.state.purchasable}
        />
      </Aux>
    );
  }
}
