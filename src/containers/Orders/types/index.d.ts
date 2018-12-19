import { RouteComponentProps } from 'react-router-dom';
import { Iingredients } from '../../../types/ingredients';
export interface IOrdersProps extends RouteComponentProps {}
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
export interface IOrdersState {
  orders: IDbOrders | null;
  loading: boolean;
  formattedOrders: IformattedOrder[];
}
