import { IDbOrders } from '../../ordersReducer/types';

export interface IContactDataReducerState {
  readonly error: Error | false;
  readonly submitting: boolean;
  readonly orders: IDbOrders;
}
