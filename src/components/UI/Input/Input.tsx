import { FunctionComponent, memo } from 'react';
import { IInputProps } from './types';
import React from 'react';
import { StyledInput } from './input.styles';
import { assertIsNever } from '../../../store/reducers/sharedUtilities';

/**
 * @interface FunctionComponent<IInputProps>
 */
const Input: FunctionComponent<IInputProps> = props => {
  const {
    type,
    id,
    name,
    placeholder,
    onChange,
    value,
    label,
    checked,
    dataSet,
    validation: { required = false } = { required: false },
    validation,
  } = props;
  let valid = true;
  if (validation && validation.touched === true && !validation.valid) {
    valid = false;
  }
  switch (type) {
    case 'text':
    case 'email':
    case 'street-address':
    case 'country-name':
    case 'tel':
    case 'password':
      return (
        <StyledInput valid={valid}>
          <label htmlFor={id}>
            <span>{label} </span>
            <input
              id={id}
              type={type}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              data-set={dataSet}
              required={required}
            />
          </label>
        </StyledInput>
      );
    case 'radio':
      return (
        <StyledInput valid={valid}>
          <label htmlFor={id} className="radio">
            <input
              id={id}
              type={type}
              name={name}
              onChange={onChange}
              value={value}
              checked={checked}
              data-set={dataSet}
            />{' '}
            <span>{label}</span>
          </label>
        </StyledInput>
      );
    case 'select':
      return null;
    default:
      assertIsNever(type);
      return null;
  }
};

// const isEqual = (prevProps: IInputProps, nextProps: IInputProps) => {
//   return (
//     nextProps.value === prevProps.value &&
//     (nextProps.checked !== undefined
//       ? nextProps.checked === prevProps.checked
//       : true)
//   );
// };

export default memo(Input);
