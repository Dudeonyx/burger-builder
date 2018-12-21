import { IcontactDataReducerActionTypes } from '../../actions/types';
import { IDbOrder, IDbOrders } from '../../../../containers/Orders/types';

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
  orders: IDbOrders;
  error: Error | false;
}
type customerKeys = keyof IContactDataReducerState['customer'];
export type IcontactDataReducerAction =
  | ({
      type: IcontactDataReducerActionTypes['UPDATE_CONTACT_FORM'];
      payload: { value: string };
    } & (
      | {
          payload: {
            set: 'basicInfo';
            name: keyof IContactDataReducerState['customer']['basicInfo'];
          };
        }
      | {
          payload: {
            set: 'address';
            name: keyof IContactDataReducerState['customer']['address'];
          };
        }
      | {
          payload: {
            set: 'deliveryMethod';
            name: 'deliveryMethod';
          };
        }))
  | {
      type: IcontactDataReducerActionTypes['RESET_CONTACT_FORM'];
    }
  | {
      type: IcontactDataReducerActionTypes['ORDER_SUCCESSFUL'];
      payload: {
        name: string;
        order: IDbOrder;
      };
    }
  | {
      type: IcontactDataReducerActionTypes['ORDER_FAILED'];
      payload: {
        error: Error | false;
      };
    };
