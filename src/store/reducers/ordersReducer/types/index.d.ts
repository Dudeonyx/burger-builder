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
