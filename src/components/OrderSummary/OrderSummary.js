import React from 'react';
import Aux from '../../hocs/ax';
import Button from '../Button/Button';

const OrderSummary = props => {
  const summary = Object.entries( props.ingredients ).map( ( [igKey, igVal] ) => (
    <li style={{ textTransform: 'capitalize' }} key={igKey}>
      {`${igKey}: ${igVal}`}
    </li>
  ) );
  return (
    <Aux>
      <h3 style={{ fontWeight: 'bold' }}>Order Summary</h3>
      <ul style={{}}>{summary}</ul>
      <p style={{ fontWeight: 'bold' }}>
        Total Cost: ${props.price.toFixed( 2 )}
      </p>
      <p>Proceed to Checkout?</p>
      <div>
        <Button onClick={props.purchaseCancel} type="Danger">
          CANCEL
        </Button>
        <Button onClick={props.purchaseContinue} type="Success">
          ORDER
        </Button>
      </div>
    </Aux>
  );
};

export default OrderSummary;
