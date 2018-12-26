import Button from '../../components/UI/Button/Button';
import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { IInputConfig } from '../../components/UI/Input/types';
import { updateform } from '../../components/UI/Input/InputUtilities';
import mapToInputs from '../../components/UI/Input/mapToInputs';
import styled from '@emotion/styled/macro';
import { boxStyle } from '../Orders/Orders.styles';
import css from '@emotion/css/macro';
import { authenticate } from '../../store/reducers/actions';
import { connect } from 'react-redux';
import { GetConnectProps } from '../../store/types';
import { RouteComponentProps } from 'react-router';

const flexColumnCenter = css`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;
const StyledAuth = styled.div`
  ${flexColumnCenter}
  & > div {
    ${boxStyle};
    min-height: 0px;
  }
  form {
    width: 90%;
    @media (min-width: 650px) {
      width: 550px;
    }
  }
`;
export interface IAuthState {
  authFormData: {
    name: IInputConfig;
    password: IInputConfig;
    email: IInputConfig;
  };
}

class Auth extends Component<IAuthProps, IAuthState> {
  constructor(props: IAuthProps) {
    super(props);

    this.state = {
      authFormData: {
        name: {
          value: '',
          type: 'text',
          placeholder: 'Your Name',
          id: 'Auth_name_id',
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
          id: 'Auth_email_id',
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
          id: 'Auth_word_id',
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
    const newAuthFormData = updateform(this.state.authFormData, e);
    this.setState({ authFormData: newAuthFormData });
  };

  public render() {
    const { name, email, password } = this.state.authFormData;
    return (
      <StyledAuth>
        <div>
          <form>
            {[email, password,].map(this.mapInputs)}
            <Button btnType="Success" onClick={this.submit}>
              SUBMIT
            </Button>
          </form>
        </div>
      </StyledAuth>
    );
  }
  private submit = (e: MouseEvent) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.authFormData.email.value,
      this.state.authFormData.password.value,
    );
  };
  private mapInputs = mapToInputs(this.handleAuthFormChange);
}

const mapAuthDispatchToProps = {
  onAuth: authenticate,
};

const connectAuth = connect(
  null,
  mapAuthDispatchToProps,
);

type IAuthProps = GetConnectProps<typeof connectAuth> & RouteComponentProps;

export default connectAuth(Auth);
