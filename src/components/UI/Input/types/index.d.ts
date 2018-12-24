import { ChangeEventHandler } from 'react';
// import PropTypes from 'prop-types';
// import { Test } from './Input.styles';

interface IInputSelectConfig {
  readonly type: 'radio' | 'select';
  readonly id: string;
  readonly name: string;
  readonly placeholder?: string;
  value: string;
  readonly label: string;
  readonly dataSet?: 'basicInfo' | 'address' | 'deliveryMethod';
  validation: IInputRules;
  options: Array<{
    readonly id: string;
    readonly label: string;
    readonly value: string;
    checked: boolean;
    readonly defaultChecked?: boolean;
  }>;
}

interface IInputTextConfig {
  readonly type:
    | 'text'
    | 'email'
    | 'street-address'
    | 'country-name'
    | 'tel'
    | 'password';
  readonly id: string;
  readonly name: string;
  readonly placeholder?: string;
  value: string;
  readonly label: string;
  readonly dataSet?: 'basicInfo' | 'address' | 'deliveryMethod';
  validation: IInputRules;
}
export type IInputConfig = IInputTextConfig | IInputSelectConfig;
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

export type IInputProps = IInputConfig & {
  onChange: ChangeEventHandler;
};
