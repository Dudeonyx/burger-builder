import React from 'react';
import classLister from 'css-module-class-lister';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import jsx2dArrayFromObject from '../../hocs/jsx2dArrayFromObject';

const classes = classLister( styles );

const burger = props => {
  const allIngredients = jsx2dArrayFromObject(
    props.ingredients,
    BurgerIngredient,
    'type'
  );
  return (
    <div className={classes( 'Burger' )}>
      <BurgerIngredient type="bread-top" />
      {allIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
