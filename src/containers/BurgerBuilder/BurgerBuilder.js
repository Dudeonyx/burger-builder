import React, { Component } from 'react';
import Aux from '../../hocs/ax';
import Burger from '../../components/Burger/Burger';

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 2,
      bacon: 1,
      meat: 1,
      cheese: 2,
    },
  };
  render() {
    return (
      <Aux>
        <div>
          <p>Burger Display</p>
          <Burger ingredients={this.state.ingredients} />
        </div>
        <div>Burger Controls</div>
      </Aux>
    );
  }
}
