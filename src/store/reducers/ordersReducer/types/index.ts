import { Iingredients } from '../../../../types/ingredients';

export interface IDbOrder {
  readonly basicInfo: {
    readonly name: string;
    readonly phone: string;
    readonly email: string;
  };
  readonly address: {
    readonly street: string;
    readonly city: string;
    readonly state: string;
    readonly country: string;
  };
  readonly deliveryMethod: string;
  readonly userId: string;
  readonly ingredients: Iingredients;
  readonly date: string;
  readonly price: string;
}
export interface IDbOrders {
  readonly [x: string]: IDbOrder;
}
export interface IformattedOrder {
  readonly id: string;
  readonly ingredients: Iingredients;
  readonly name: string;
  readonly totalPrice: string;
}
// tslint:disable-next-line: interface-name
interface ExtendedError extends Error {
  [x: string]: any;
}
export interface IordersReducerState {
  readonly orders: IDbOrders | null;
  readonly loading: boolean;
  readonly error: ExtendedError | null;
}
