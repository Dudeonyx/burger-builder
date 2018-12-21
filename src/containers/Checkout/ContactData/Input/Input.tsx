/** @jsx jsx */
import { jsx } from '@emotion/core';
import css from '@emotion/css/macro';
import { FunctionComponent } from 'react';
import { IInputProps } from './types';

const dfdfdf = jsx;
const StyledInput = css`
  * {
    box-sizing: border-box;
  }
  label {
    display: flex;
    justify-content: space-between;
  }
  label.radio {
    justify-content: center;
  }
  span {
    flex: 2 1 5em;
    align-self: center;
    text-align: left;
    padding-left: 1em;
  }
  input {
    flex: 10 1 auto;
    background-color: rgba(255, 255, 255, 0.74);
    border-radius: 10px;
    padding: 4px;
    outline: none;
  }
  .radio input {
    flex: 0;
  }
  input:focus {
    background-color: rgb(255, 255, 255);
    border: 2px solid rgb(255, 166, 0);
  }
  @media (max-width: 400px) {
    font-size: 0.85em;
  }
`;
/**
 * @param {IInputProps} props
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
    required,
  } = props;
  switch (type) {
    case 'text':
    case 'email':
    case 'street-address':
    case 'country-name':
    case 'tel':
      return (
        <div css={StyledInput}>
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
        </div>
      );
    case 'radio':
      return (
        <div css={StyledInput}>
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
        </div>
      );
    default:
      return null;
  }
};

export default Input;
