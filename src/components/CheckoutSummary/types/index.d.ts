import { MouseEventHandler } from 'react';
import { IOrderIngredientsPrice } from '../../OrderText/types';
export interface ICheckoutSummaryProps extends IOrderIngredientsPrice {
  checkoutCancel: MouseEventHandler;
  checkoutContinue: MouseEventHandler;
  purchasable: boolean;
}
