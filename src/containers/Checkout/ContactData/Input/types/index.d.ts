import { ChangeEventHandler } from 'react';
// import PropTypes from 'prop-types';
// import { Test } from './Input.styles';
export interface IInputProps {
  type:
    | 'text'
    | 'email'
    | 'street-address'
    | 'country-name'
    | 'tel'
    | 'radio'
    | 'select';
  id: string;
  name: string;
  placeholder?: string;
  onChange: ChangeEventHandler;
  value: string;
  label: string;
  defaultChecked?: boolean;
  checked?: boolean;
  dataSet: 'basicInfo' | 'address' | 'deliveryMethod';
  options?: Array<{
    value: string;
    label: string;
  }>;
  required?: boolean;
}
