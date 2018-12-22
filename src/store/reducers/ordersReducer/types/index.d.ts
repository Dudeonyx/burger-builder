import { Iingredients } from '../../../../types/ingredients';
import { IActionTypes } from '../../actions/types';

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

export type IordersReducerAction =
  | {
      type: IActionTypes['SET_ORDERS'];
      payload: {
        orders: IDbOrders | null;
      };
    }
  | {
      type: IActionTypes['SET_ORDERS_LOADING'];
    }
  | {
      type: IActionTypes['SET_FORMATTEDORDERS'];
      payload: {
        formattedOrders: IformattedOrder[];
      };
    };
