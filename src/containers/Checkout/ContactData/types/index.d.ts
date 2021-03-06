import { IInputConfig } from '../../../../components/UI/Input/types';

export interface IContactDataState {
  customer: {
    name: IInputConfig;
    phone: IInputConfig;
    email: IInputConfig;
    street: IInputConfig;
    city: IInputConfig;
    state: IInputConfig;
    country: IInputConfig;
    deliveryMethod: IInputConfig;
  };
}
