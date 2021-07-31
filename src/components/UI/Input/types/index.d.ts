import { ChangeEventHandler } from 'react';
// import PropTypes from 'prop-types';
// import { Test } from './Input.styles';

interface InputConfigBase {
  readonly id: string;
  readonly name: string;
  readonly placeholder?: string;
  readonly value: string;
  readonly label: string;
  readonly dataSet?: string;
  validation: InputRules;
}
interface InputSelectConfig extends InputConfigBase {
  readonly type: 'select';
  options: ReadonlyArray<{
    readonly id: string;
    readonly label: string;
    readonly value: string;
    readonly defaultChecked?: boolean;
  }>;
}
interface InputRadioConfig extends InputConfigBase {
  readonly type: 'radio';
  options: ReadonlyArray<{
    readonly id: string;
    readonly label: string;
    readonly value: string;
    readonly checked: boolean;
    readonly defaultChecked?: boolean;
  }>;
}

interface InputTextConfig extends InputConfigBase {
  readonly type: 'text' | 'email' | 'street-address' | 'country-name' | 'tel' | 'password';
}
export type InputConfig = InputTextConfig | InputSelectConfig | InputRadioConfig;
interface BaseInputRules {
  readonly required?: boolean;
  readonly minLength?: number;
  readonly maxLength?: number;
  readonly valid: boolean;
  readonly touched: boolean;
}

interface IsEmail {
  readonly isEmail?: true;
  readonly isNumeric?: false;
}
interface IsNumeric {
  readonly isEmail?: false;
  readonly isNumeric?: true;
}
export type InputRules = BaseInputRules & (IsEmail | IsNumeric);

export type InputProps = InputConfig & {
  onChange: ChangeEventHandler;
};
