import { IDbOrders } from '../../ordersReducer/types';

export interface IContactDataReducerState {
  error: Error | false;
  submitting: boolean;
  orders: IDbOrders;
}
