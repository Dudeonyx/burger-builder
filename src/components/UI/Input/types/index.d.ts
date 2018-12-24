import { ChangeEventHandler } from 'react';
// import PropTypes from 'prop-types';
// import { Test } from './Input.styles';
export interface IInputConfig {
  readonly type:
    | 'text'
    | 'email'
    | 'street-address'
    | 'country-name'
    | 'tel'
    | 'radio'
    | 'password'
    | 'select';
  readonly id: string;
  readonly name: string;
  readonly placeholder?: string;
  value: string;
  readonly label: string;
  readonly defaultChecked?: boolean;
  checked?: boolean;
  readonly dataSet?: 'basicInfo' | 'address' | 'deliveryMethod';
  validation?: IInputRules;
}
interface IBaseInputRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  valid: boolean;
  touched: boolean;
}

interface IisEmail {
  isEmail?: true;
  isNumeric?: false;
}
interface IisNumeric {
  isEmail?: false;
  isNumeric?: true;
}
export type IInputRules = IBaseInputRules & (IisEmail | IisNumeric);

export interface IInputProps extends IInputConfig {
  options?: Array<{
    value: string;
    label: string;
  }>;
  onChange: ChangeEventHandler;
}
