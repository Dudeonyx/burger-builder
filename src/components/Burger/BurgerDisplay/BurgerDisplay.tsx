import React, { ComponentType, FunctionComponent, ReactElement } from 'react';
import BurgerIngredient from '../BurgerIngredient/BurgerIngredient';
import styles from './BurgerDisplay.module.css';
import { Iingredients } from '../../../types/ingredients';

export const jsxArrayFromObject = <
  R extends string,
  O extends { [x in R]?: number }
>(
  GivenComponent: ComponentType<{ type: R }>,
  inputObject: O,
): Array<ReactElement<{ type: R }>> => {
  const useable = (Object.entries(inputObject) as Array<[R, number]>)
    .map(([igKey, igVal,]) => {
      return [...Array(igVal),].map((_, i) => {
        // const myprops: P = {} as P;
        //  myprops[propName] = igKey as unknown as P[keyof P];
        // // };
        return <GivenComponent {...{ type: igKey }} key={igKey + (i + 1)} />;
      });
    })
    .reduce((arr, subArr) => [...arr, ...subArr,], []);

  return useable;
};
export interface IburgerDisplay {
  ingredients: Iingredients;
  // ingredients: {Iingredients: any};
  // ingredients: any;
}
const burgerDisplay: FunctionComponent<IburgerDisplay> = props => {
  let allIngredients = jsxArrayFromObject(BurgerIngredient, props.ingredients);
  if (allIngredients.length === 0) {
    allIngredients = <p>Please start adding ingredients</p> as any;
  }
  return (
    <div className={styles.Burger}>
      <BurgerIngredient type="bread-top" />
      {allIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default React.memo(burgerDisplay);
