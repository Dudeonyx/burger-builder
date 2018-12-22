import { IActionTypes } from '../../actions/types';
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
  submitting: boolean;
}
type customerKeys = keyof IContactDataReducerState['customer'];
