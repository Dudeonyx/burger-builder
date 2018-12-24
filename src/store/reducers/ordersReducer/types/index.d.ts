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
  formattedOrders: IformattedOrder[];
}

interface ISET_ORDERS {
  type: typeof actionTypes.SET_ORDERS;
  payload: {
    orders: IDbOrders;
  };
}
interface ISET_ORDERS_LOADING {
  type: typeof actionTypes.SET_ORDERS_LOADING;
}
interface ISET_FORMATTEDORDERS {
  type: typeof actionTypes.SET_FORMATTEDORDERS;
  payload: {
    formattedOrders: IformattedOrder[];
  };
}

export type IordersReducerAction =
  | ISET_ORDERS
  | ISET_ORDERS_LOADING
  | ISET_FORMATTEDORDERS;
