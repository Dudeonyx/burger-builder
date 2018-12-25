import React, { FunctionComponent, lazy, Suspense } from 'react';
import Loader from '../UI/Loader/Loader';
import styled from '@emotion/styled/macro';
import { ICheckoutSummaryProps } from './types';
import OrderText from '../OrderText/OrderText';
import Button from '../UI/Button/Button';

const BurgerDisplay = lazy(() =>
  import(/* webpackChunkName: "BurgerDisplay" */ '../Burger/BurgerDisplay/BurgerDisplay'),
);
const StyledCheckoutSummary = styled.div`
  /* max-width: 80%; */
  text-align: center;
  margin: auto;
  /* 
  @media (min-width: 550px) {
    max-width: 500px;
  } */
`;
const CheckoutSummary: FunctionComponent<ICheckoutSummaryProps> = ({
  ingredients,
  totalCost,
  checkoutCancel,
  checkoutContinue,
  purchasable,
}) => {
  return (
    <StyledCheckoutSummary>
      <h3>We Hope You'll Enjoy This</h3>
      <Suspense fallback={<Loader />}>
        <BurgerDisplay {...{ ingredients }} />
      </Suspense>
      <OrderText
        {...{ ingredients, totalCost }}
        totalCostPrefix="The total cost of your order is"
      />
      <div>
        <Button btnType="Danger" onClick={checkoutCancel}>
          CANCEL
        </Button>
        <Button
          disabled={!purchasable}
          btnType="Success"
          onClick={checkoutContinue}
        >
          CONTINUE
        </Button>
      </div>
    </StyledCheckoutSummary>
  );
};

export default CheckoutSummary;
