import React from 'react';
import styles from './BurgerDisplay.module.css';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';

export const jsxArrayFromObject = ( inputObject, GivenComponent, propName ) => {
  return Object.entries( inputObject )
    .map( ( [igKey, igVal] ) => {
      return [...Array( igVal )].map( ( _, i ) => {
        const myprops = {
          [propName]: igKey,
        };
        return <GivenComponent {...myprops} key={igKey + ( i + 1 )} />;
      } );
    } )
    .reduce( ( arr, subArr ) => [...arr, ...subArr], [] );
};

const burgerDisplay = props => {
  let allIngredients = jsxArrayFromObject( props.ingredients, BurgerIngredient, 'type' );
  if ( allIngredients.length === 0 ) {
    allIngredients = <p>Please start adding ingredients</p>;
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {allIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default React.memo( burgerDisplay );
