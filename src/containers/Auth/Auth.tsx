import Button from '../../components/UI/Button/Button';
import React, { Component, ChangeEvent, MouseEvent } from 'react';
import { IInputConfig } from '../../components/UI/Input/types';
import { updateform } from '../../components/UI/Input/InputUtilities';
import mapToInputs from '../../components/UI/Input/mapToInputs';
import { authenticate } from '../../store/reducers/actions';
import { connect } from 'react-redux';
import { GetConnectProps, StoreState } from '../../store/types';
import { RouteComponentProps } from 'react-router';
import {
  selectAuthAuthenticating,
  selectAuthError,
  getAuthErrorMessage,
  getPurchaseableFromStore,
  selectAuthRedirectUrl,
} from '../../store/selectors/selectors';
import Loader from '../../components/UI/Loader/Loader';
import { StyledAuth } from './Auth.styles';
import { setAuthRedirectUrl } from '../../store/reducers/actions/AuthActions';

export interface IAuthState {
  authFormData: {
    name: IInputConfig;
    password: IInputConfig;
    email: IInputConfig;
  };
  isSignUp: boolean;
  readonly redirectUrl: string;
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
      isSignUp: true,
      redirectUrl: this.props.redirectUrl,
    };
  }
  public componentDidMount = () => {
    this.props.setAuthRedirectUrl('/')
  }
  

  private handleAuthFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newAuthFormData = updateform(this.state.authFormData, e);
    this.setState({ authFormData: newAuthFormData });
  };

  public render() {
    const { email, password } = this.state.authFormData;
    const authError = this.props.error ? (
      <p className="error">{this.props.errorMessage}</p>
    ) : null;

    const form = this.props.authenticating ? (
      <Loader />
    ) : (
      <>
        {authError}
        <p className="info">{this.state.isSignUp ? 'SIGNUP' : 'LOGIN'}</p>
        <form>
          {[email, password,].map(this.mapInputs)}
          <Button btnType="Success" onClick={this.submitHandler}>
            SUBMIT
          </Button>
        </form>
        <Button btnType="Danger" onClick={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </>
    );
    return (
      <StyledAuth>
        <div>{form}</div>
      </StyledAuth>
    );
  }
  private switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignUp: !prevState.isSignUp }));
  };
  private submitHandler = async (e: MouseEvent) => {
    e.preventDefault();
    await this.props.onAuth(
      this.state.authFormData.email.value,
      this.state.authFormData.password.value,
      this.state.isSignUp,
    );
    if (this.props.error) {
      return;
    }
 
    // this.props.purchasable ?
    this.props.history.push(this.state.redirectUrl);
    // : this.props.history.push('/');
  };
  private mapInputs = mapToInputs(this.handleAuthFormChange);
}

const mapAuthStateToProps = (state: StoreState) => {
  return {
    authenticating: selectAuthAuthenticating(state),
    error: selectAuthError(state),
    errorMessage: getAuthErrorMessage(state),
    purchasable: getPurchaseableFromStore(state),
    redirectUrl: selectAuthRedirectUrl(state),
  };
};
const mapAuthDispatchToProps = {
  onAuth: authenticate,
  setAuthRedirectUrl,
};

const connectAuth = connect(
  mapAuthStateToProps,
  mapAuthDispatchToProps,
);

type IAuthProps = GetConnectProps<typeof connectAuth> & RouteComponentProps;

export default connectAuth(Auth);
