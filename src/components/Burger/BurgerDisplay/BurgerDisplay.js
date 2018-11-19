import React from 'react';
import styles from './BurgerDisplay.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import jsxArrayFromObject from '../../../hocs/jsxArrayFromObject';

const burgerDisplay = props => {
  let allIngredients = jsxArrayFromObject(
    props.ingredients,
    BurgerIngredient,
    'type'
  );
  if ( allIngredients.length === 0 ) {
    allIngredients = <p>Please start adding ingredients</p>;
  }
  console.log( allIngredients );
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {allIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default React.memo( burgerDisplay );
