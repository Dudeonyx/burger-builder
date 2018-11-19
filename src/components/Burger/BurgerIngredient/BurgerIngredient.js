import React, { Component } from 'react';
import classer from 'react-classer';
import styles from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

const classes = classer( styles );

class BurgerIngredient extends Component {
  render() {
    const ingredient = {
      'bread-top': (
        <div {...classes( 'BreadTop' )}>
          <div {...classes( 'Seeds1' )} />
          <div {...classes( 'Seeds2' )} />
        </div>
      ),
      'bread-bottom': <div {...classes( 'BreadBottom' )} />,
      meat: <div {...classes( 'Meat' )} />,
      cheese: <div {...classes( 'Cheese' )} />,
      salad: <div {...classes( 'Salad' )} />,
      bacon: <div {...classes( 'Bacon' )} />,
    };
    return ingredient[this.props.type] || null;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
