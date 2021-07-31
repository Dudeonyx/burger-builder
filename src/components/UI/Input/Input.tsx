import { InputProps } from './types';
import { FunctionComponent, memo } from 'react';
import { StyledInput } from './input.styles';

const isNever = (_arg: never): _arg is never => true;

const emailPattern =
  '[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?';
const emailConfig = {
  pattern: emailPattern,
  title: 'Valid Email Address',
};
/**
 * @interface FunctionComponent<IInputProps>
 */
const Input: FunctionComponent<InputProps> = props => {
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
          <label htmlFor={id} className="txtLbl">
            {label}
          </label>
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
          <select id={id} onChange={onChange} name={name} required={required} value={value}>
            {selectList}
          </select>
        </>
      );
    default:
      isNever(props);
      return null;
  }
};

export default memo(Input);
