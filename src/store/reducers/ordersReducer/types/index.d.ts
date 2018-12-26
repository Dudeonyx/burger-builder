import { Iingredients } from '../../../../types/ingredients';
import { actionTypes } from '../../actions';

export interface IDbOrder {
  basicInfo: {
    name: string;
    phone: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
  };
  deliveryMethod: string;
  ingredients: Iingredients;
  date: string;
  price: string;
}
export interface IDbOrders {
  [x: string]: IDbOrder;
}
export interface IformattedOrder {
  id: string;
  ingredients: Iingredients;
  name: string;
  totalPrice: string;
}
export interface IordersReducerState {
  orders: IDbOrders | null;
  loading: boolean;
  error: Error & { [x: string]: any } | null;
}

interface ISET_ORDERS {
  type: typeof actionTypes.SET_ORDERS;
  payload: {
    orders: IDbOrders | null;
  };
}
interface ISET_ORDERS_ERROR {
  type: typeof actionTypes.SET_ORDERS_ERROR;
  payload: {
    error: Error & { [x: string]: any };
  };
}
interface ISET_ORDERS_LOADING {
  type: typeof actionTypes.SET_ORDERS_LOADING;
}

export type IordersReducerAction =
  | ISET_ORDERS
  | ISET_ORDERS_LOADING
  | ISET_ORDERS_ERROR;
