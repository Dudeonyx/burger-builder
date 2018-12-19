import { RouteComponentProps } from 'react-router-dom';
import { Iingredients } from '../../../../types/ingredients';

export interface IContactDataProps extends RouteComponentProps {
  ingredients: Iingredients;
  totalPrice: string;
}
export interface IInputConfig {
  value: string;
  type: 'text' | 'email' | 'street-address' | 'country-name' | 'tel' | 'radio';
  placeholder?: string;
  id: string;
  name: string;
  label: string;
  dataSet: 'basicInfo' | 'address' | 'deliveryMethod';
  checked?: boolean;
  defaultChecked?: boolean;
  required?: boolean;
}
// tslint:disable-next-line:no-empty-interface
export interface IContactDataState {
  loading: boolean;
}
