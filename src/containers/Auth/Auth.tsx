import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import React, { Component, ChangeEvent } from 'react';
import { IInputConfig } from '../../components/UI/Input/types';
import { verifyObjKey } from '../../shared/verifyObjKey';
import { checkValidity } from '../../components/UI/Input/checkInputValidity';

// tslint:disable-next-line: no-empty-interface
export interface IAuthProps {}

export interface IAuthState {
  authFormData: {
    name: IInputConfig;
    password: IInputConfig;
    email: IInputConfig;
  };
}

export default class Auth extends Component<IAuthProps, IAuthState> {
  constructor(props: IAuthProps) {
    super(props);

    this.state = {
      authFormData: {
        name: {
          value: '',
          type: 'text',
          placeholder: 'Your Name',
          id: 'name_id',
          name: 'name',
          label: 'Name:',
          validation: {
            required: true,
            valid: false,
            touched: false,
            minLength: 5,
          },
        },
        email: {
          value: '',
          type: 'email',
          placeholder: 'Your Email',
          id: 'email_id',
          name: 'email',
          label: 'Email:',
          validation: {
            required: true,
            valid: false,
            touched: false,
            minLength: 5,
            isEmail: true,
          },
        },
        password: {
          value: '',
          type: 'password',
          placeholder: 'Password',
          id: 'word_id',
          name: 'password',
          label: 'Password:',
          validation: {
            required: true,
            valid: false,
            touched: false,
            minLength: 6,
          },
        },
      },
    };
  }

  private handleAuthFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newAuthFormData = { ...this.state.authFormData };
    if (verifyObjKey(newAuthFormData, name)) {
      // newAuthFormData[name].value = value;
      const newSubField = { ...newAuthFormData[name] };
      newSubField.value = value;
      if (newSubField.validation) {
        const newValidation = { ...newSubField.validation };
        const valid = checkValidity(value, newSubField.validation);
        newValidation.valid = valid;
        newValidation.touched = true;
        // newSubField.validation = newValidation;
        this.setState({
          authFormData: {
            ...newAuthFormData,
            [name]: { ...newSubField, validation: newValidation },
          },
        });
        return;
      }

      // newAuthFormData[name] = newSubField;
      this.setState({
        authFormData: {
          ...newAuthFormData,
          [name]: { ...newSubField },
        },
      });
      return;
    }
    // this.setState({ [name]: value})
  };

  public render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form style={{ width: '500px' }}>
          {Object.values(this.state.authFormData).map(this.mapInputs)}
          <Button btnType="Success" onClick={() => ''}>
            {' '}
            SUBMIT
          </Button>
        </form>
      </div>
    );
  }

  private mapInputs = (
    obj: IInputConfig,
    _index: number,
    _array: IInputConfig[],
  ) => {
    return <Input {...obj} key={obj.id} onChange={this.handleAuthFormChange} />;
  };
}
