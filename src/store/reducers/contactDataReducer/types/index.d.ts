import { IActionTypes } from '../../actions/types';
import { IDbOrders, IDbOrder } from '../../ordersReducer/types';
import { Iingredients } from '../../../../types/ingredients';
export interface IReducerInputConfig {
  value: string;
  readonly type:
    | 'text'
    | 'email'
    | 'street-address'
    | 'country-name'
    | 'tel'
    | 'radio';
  readonly placeholder?: string;
  readonly id: string;
  readonly name: string;
  readonly label: string;
  readonly dataSet: 'basicInfo' | 'address' | 'deliveryMethod';
  checked?: boolean;
  readonly defaultChecked?: boolean;
  readonly required?: boolean;
}
// tslint:disable-next-line:no-empty-interface
export interface IContactDataReducerState {
  customer: {
    basicInfo: {
      name: IReducerInputConfig;
      phone: IReducerInputConfig;
      email: IReducerInputConfig;
    };
    address: {
      street: IReducerInputConfig;
      city: IReducerInputConfig;
      state: IReducerInputConfig;
      country: IReducerInputConfig;
    };
    deliveryMethod: {
      deliveryMethod: {
        value: string;
        options: IReducerInputConfig[];
      };
    };
  };
  presubmitOrder: IDbOrder | null;
  orders: IDbOrders;
  error: Error | false;
  submitting: boolean;
}
type customerKeys = keyof IContactDataReducerState['customer'];

export interface IUPDATE_CONTACT_FORM {
  type: IActionTypes['UPDATE_CONTACT_FORM'];
  payload: { value: string } & (
    | {
        set: 'basicInfo';
        name: keyof IContactDataReducerState['customer']['basicInfo'];
      }
    | {
        set: 'address';
        name: keyof IContactDataReducerState['customer']['address'];
      }
    | {
        set: 'deliveryMethod';
        name: 'deliveryMethod';
      });
}

export interface IRESET_CONTACT_FORM {
  type: IActionTypes['RESET_CONTACT_FORM'];
}

export interface IORDER_SUCCESSFUL {
  type: IActionTypes['ORDER_SUCCESSFUL'];
  payload: {
    name: string;
    order: IDbOrder;
  };
}
export interface IORDER_FAILED {
  type: IActionTypes['ORDER_FAILED'];
  payload: {
    error: Error | false;
  };
}
export interface ISET_ORDER_SUBMITTING {
  type: IActionTypes['SET_ORDER_SUBMITTING'];
}
export interface IGENERATE_PRESUBMIT_ORDER {
  type: IActionTypes['GENERATE_PRESUBMIT_ORDER'];
  payload: {
    ingredients: Iingredients;
    totalPrice: string;
  };
}
export type IContactDataReducerActions =
  | IUPDATE_CONTACT_FORM
  | IRESET_CONTACT_FORM
  | IORDER_SUCCESSFUL
  | IORDER_FAILED
  | ISET_ORDER_SUBMITTING
  | IGENERATE_PRESUBMIT_ORDER;
