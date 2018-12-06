import PropTypes from 'prop-types';
import React, { Component, FunctionComponent } from 'react';
import styles from './BurgerIngredient.module.css';


const ingredient = {
  bacon: <div className={styles.Bacon} />,
  'bread-bottom': <div className={styles.BreadBottom} />,
  'bread-top': (
    <div className={styles.BreadTop}>
      <div className={styles.Seeds1} />
      <div className={styles.Seeds2} />
    </div>
  ),
  cheese: <div className={styles.Cheese} />,
  meat: <div className={styles.Meat} />,
  salad: <div className={styles.Salad} />,
};
  export interface IBurgerIngredient {
    type: 'bacon' | 'bread-bottom' | 'bread-top' | 'cheese' | 'meat' | 'salad';
  }
const BurgerIngredient: FunctionComponent<IBurgerIngredient> = ({type}) => {
  
  return ingredient[type] || null;
  
}


export default BurgerIngredient;
