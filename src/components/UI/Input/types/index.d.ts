import { ChangeEventHandler } from 'react';
// import PropTypes from 'prop-types';
// import { Test } from './Input.styles';

interface IInputConfigBase {
  readonly id: string;
  readonly name: string;
  readonly placeholder?: string;
  readonly value: string;
  readonly label: string;
  readonly dataSet?: 'basicInfo' | 'address' | 'deliveryMethod';
  validation: IInputRules;
}
interface IInputSelectConfig extends IInputConfigBase {
  readonly type: 'select';
  options: ReadonlyArray<{
    readonly id: string;
    readonly label: string;
    readonly value: string;
    readonly defaultChecked?: boolean;
  }>;
}
interface IInputRadioConfig extends IInputConfigBase {
  readonly type: 'radio';
  options: ReadonlyArray<{
    readonly id: string;
    readonly label: string;
    readonly value: string;
    readonly checked: boolean;
    readonly defaultChecked?: boolean;
  }>;
}

interface IInputTextConfig extends IInputConfigBase {
  readonly type: 'text' | 'email' | 'street-address' | 'country-name' | 'tel' | 'password';
}
export type IInputConfig = IInputTextConfig | IInputSelectConfig | IInputRadioConfig;
interface IBaseInputRules {
  readonly required?: boolean;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly valid: boolean;
  readonly touched: boolean;
}

interface IisEmail {
  readonly isEmail?: true;
  readonly isNumeric?: false;
}
interface IisNumeric {
  readonly isEmail?: false;
  readonly isNumeric?: true;
}
export type IInputRules = IBaseInputRules & (IisEmail | IisNumeric);

export type IInputProps = IInputConfig & {
  onChange: ChangeEventHandler;
};
