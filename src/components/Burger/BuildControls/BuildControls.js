import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';

const buildControls = props => {
  const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
  ];
  console.log( props );
  const disabledCheck = {
    ...props.ingredients,
  };
  Object.entries( disabledCheck ).forEach( ( [key, value] ) => {
    disabledCheck[key] = value <= 0;
  } );
  return (
    <div className={styles.BuildControls}>
      <p>
        Current Price: <strong>${props.price.toFixed( 2 )}</strong>
      </p>
      {controls.map( ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.increase( ctrl.type )}
          removed={() => props.decrease( ctrl.type )}
          disabled={disabledCheck[ctrl.type]}
        />
      ) )}
      <button
        onClick={props.purchaseStart}
        className={styles.OrderButton}
        disabled={!props.purchasable}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default React.memo( buildControls );
