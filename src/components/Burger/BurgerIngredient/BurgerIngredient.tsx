import React, { FunctionComponent } from 'react';
import styles from './BurgerIngredient.module.css';
import { IBurgerIngredientProps } from './types';

const ingredient = (type: IBurgerIngredientProps['type']) => {
  switch (type) {
    case 'bread-bottom':
      return <div className={styles.BreadBottom} />;
    case 'bread-top':
      return (
        <div className={styles.BreadTop}>
          <div className={styles.Seeds1} />
          <div className={styles.Seeds2} />
        </div>
      );
    case 'bacon':
      return <div className={styles.Bacon} />;
    case 'cheese':
      return <div className={styles.Cheese} />;
    case 'meat':
      return <div className={styles.Meat} />;
    case 'salad':
      return <div className={styles.Salad} />;
    default:
      return null;
  }
};
const BurgerIngredient: FunctionComponent<IBurgerIngredientProps> = ({
  type,
}) => {
  return ingredient(type);
};

export default React.memo(BurgerIngredient);
