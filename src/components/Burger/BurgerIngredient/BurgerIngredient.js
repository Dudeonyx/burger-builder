import React, { Component } from 'react';
import classLister from 'css-module-class-lister';
import styles from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

const classes = classLister( styles );

class BurgerIngredient extends Component {
  render() {
    const ingredient = {
      'bread-top': (
        <div className={classes( 'BreadTop' )}>
          <div className={classes( 'Seeds1' )} />
          <div className={classes( 'Seeds2' )} />
        </div>
      ),
      'bread-bottom': <div className={classes( 'BreadBottom' )} />,
      meat: <div className={classes( 'Meat' )} />,
      cheese: <div className={classes( 'Cheese' )} />,
      salad: <div className={classes( 'Salad' )} />,
      bacon: <div className={classes( 'Bacon' )} />,
    };
    return ingredient[this.props.type] || null;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
