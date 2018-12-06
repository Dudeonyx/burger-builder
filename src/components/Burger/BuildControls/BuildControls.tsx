import React, { FunctionComponent, memo, MouseEventHandler } from 'react';
import { Iingredients } from '../../../containers/BurgerBuilder';
import BuildControl from './BuildControl';
import styles from './BuildControls.module.css';

export type IingredientsKeys = keyof Iingredients;
export interface IbuildControlsProps {
  ingredients: Iingredients;
  price: number;
  increase: (e: IingredientsKeys) => void;
  decrease: (e: IingredientsKeys) => void;
  purchaseStart: MouseEventHandler;
  purchasable: boolean;
}
 const gfg: IingredientsKeys = 'salad';
const ddfg = {
  [gfg]: 'fgfg'
}

export type TdisabledCheck = { [x in IingredientsKeys]: boolean };

export type Tcontrols = Array<{ label: string; type: IingredientsKeys }>;

const buildControls: FunctionComponent<IbuildControlsProps> = ({
  decrease,
  increase,
  ingredients,
  price,
  purchasable,
  purchaseStart
}) => {
  const controls: Tcontrols = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
  ];

  const disabledCheck: TdisabledCheck = {
    bacon: false,
    cheese: false,
    meat: false,
    salad: false
  };
  (Object.entries(ingredients) as Array<[IingredientsKeys, number]>).forEach(
    ([key, value]) => {
      disabledCheck[key] = value <= 0;
    }
  );

  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price: <strong>${price.toFixed(2)}</strong>
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
        disabled={!purchasable}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default memo(buildControls);
