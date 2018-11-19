import React, { Component } from 'react';
import styles from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
  render() {
    const ingredient = {
      'bread-top': (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1} />
          <div className={styles.Seeds2} />
        </div>
      ),
      'bread-bottom': <div className={styles.BreadBottom} />,
      meat: <div className={styles.Meat} />,
      cheese: <div className={styles.Cheese} />,
      salad: <div className={styles.Salad} />,
      bacon: <div className={styles.Bacon} />,
    };
    return ingredient[this.props.type] || null;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
