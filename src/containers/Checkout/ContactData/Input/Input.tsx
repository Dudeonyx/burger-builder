import React, {
  FunctionComponent,
  MouseEventHandler,
  ChangeEventHandler,
} from 'react';
import styled from 'styled-components';
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
  options?: Array<{ value: string; label: string }>;
}

const StyledInput = styled.div`
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
 * @param {IInputProps} {
 *   inputType,
 *   id,
 *   name,
 *   placeholder,
 *   onChange,
 *   value,
 *   label,
 *   defaultChecked
 * }
 * @interface FunctionComponent<IInputProps>
 */
const Input: FunctionComponent<IInputProps> = ({
  type,
  id,
  name,
  placeholder,
  onChange,
  value,
  label,
  defaultChecked,
  checked,
  dataSet,
},) => {
  let input;
  switch (type) {
    case 'text':
    case 'email':
    case 'street-address':
    case 'country-name':
    case 'tel':
      input = (
        <StyledInput>
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
            />
          </label>
        </StyledInput>
      );
      break;
    case 'radio':
      input = (
        <StyledInput>
          <label htmlFor={id} className="radio">
            <input
              id={id}
              type={type}
              name={name}
              onChange={onChange}
              value={value}
              defaultChecked={defaultChecked}
              data-set={dataSet}
            />{' '}
            <span>{label}</span>
          </label>
        </StyledInput>
      );
      break;
    case 'select':
      // input = (
      //   <div>
      //     <input
      //       id={id}
      //       type={type}
      //       name={name}
      //       onChange={onChange}
      //       value={value}
      //       defaultChecked={defaultChecked}
      //       data-set={dataSet}
      //     />
      //     <label htmlFor={id}>{label} </label>
      //   </div>
      // );
      break;
    default:
      break;
  }

  return <>{input}</>;
};

// Input.propTypes = {
//   // bla: PropTypes.string,
// };

// Input.defaultProps = {
//   // bla: 'test',
// };

export default Input;
