import { FunctionComponent, memo } from 'react';
import { IInputProps } from './types';
import React from 'react';
import { StyledInput } from './input.styles';
import { assertIsNever } from '../../../store/reducers/sharedUtilities';

const emailPattern =
  '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$';
const emailConfig = {
  pattern: emailPattern,
  title: 'Valid Email Address',
};
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
    dataSet,
    validation: { required = false } = { required: false },
    validation,
  } = props;
  let valid = true;
  if (validation && validation.touched === true && !validation.valid) {
    valid = false;
  }
  switch (props.type) {
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
              {...(type === 'email' ? emailConfig : null)}
              onChange={onChange}
              value={value}
              data-set={dataSet}
              required={required}
              minLength={validation.minLength}
              maxLength={validation.maxLength}
            />
            <i />
          </label>
        </StyledInput>
      );
    case 'radio':
      const radioBtns = props.options
        ? props.options.map(obj => (
            <label htmlFor={id} className="radio" key={obj.id}>
              <input
                id={obj.id}
                type={type}
                name={name}
                onChange={onChange}
                value={obj.value}
                checked={obj.checked}
                defaultChecked={obj.defaultChecked}
                data-set={dataSet}
              />{' '}
              <span>{obj.label}</span>
            </label>
          ))
        : null;
      return (
        <StyledInput valid={valid} id={id}>
          {radioBtns}
        </StyledInput>
      );
    case 'select':
      const selectList = props.options
        ? props.options.map(obj => (
            <option
              key={obj.id}
              id={obj.id}
              value={obj.value}
              data-set={dataSet}
              children={obj.label}
            />
          ))
        : null;
      return (
        <>
          <label htmlFor={id} className="select" children={label} />
          <select
            id={id}
            onChange={onChange}
            name={name}
            required={required}
            value={value}
          >
            {selectList}
          </select>
        </>
      );
    default:
      assertIsNever(props);
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
