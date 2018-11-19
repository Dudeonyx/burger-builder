import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import styles from './BuildControls.module.css';
import classer from 'react-classer';
const classes = classer( styles );

const buildControls = props => {
  const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
  ];
  console.log( props );
  return (
    <div {...classes( 'BuildControls' )}>
      <p>
        Current Price: <strong>${props.price.toFixed( 2 )}</strong>
      </p>
      {controls.map( ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.increase( ctrl.type )}
          removed={() => props.decrease( ctrl.type )}
          disabled={props.disabledCheck[ctrl.type]}
        />
      ) )}
      <button {...classes( 'OrderButton' )} disabled={!props.purchasable}>
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
