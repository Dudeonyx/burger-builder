import React, { FunctionComponent, memo } from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';
import { IingredientsKeys } from '../../../types/ingredients';
import { IbuildControlsProps, TdisabledCheck, Tcontrols } from './types/index';

export const controls: Tcontrols = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];
const buildControls: FunctionComponent<IbuildControlsProps> = ({
  decrease,
  increase,
  ingredients,
  price,
  purchaseable,
  purchaseStart,
}) => {
  const disabledCheck: TdisabledCheck = {
    bacon: false,
    cheese: false,
    meat: false,
    salad: false,
  };
  (Object.entries(ingredients) as Array<[IingredientsKeys, number]>).forEach(
    ([key, value,]) => {
      disabledCheck[key] = value <= 0;
    },
  );

  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price: <strong>${price}</strong>
      </p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => increase(ctrl.type)}
          removed={() => decrease(ctrl.type)}
          disabled={disabledCheck[ctrl.type]}
        />
      ))}
      <button
        onClick={purchaseStart}
        className={styles.OrderButton}
        disabled={!purchaseable}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default memo(buildControls);
