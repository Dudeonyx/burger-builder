import Button from '../../components/UI/Button/Button';
import React, { MouseEvent, useState, useEffect, FC, useCallback, useLayoutEffect } from 'react';
import { makeMapToInputs } from '../../components/UI/Input/';
import { authenticate } from '../../store/actions';
import { connect } from 'react-redux';
import { GetConnectProps, Store } from '../../store/';
import { RouteComponentProps } from 'react-router';
import {
  selectAuthAuthenticating,
  selectAuthError,
  getAuthErrorMessage,
  selectAuthRedirectUrl,
  getAuthenticated,
} from '../../store/selectors/';
import Loader from '../../components/UI/Loader/Loader';
import { StyledAuth } from './Auth.styles';
import { setAuthRedirectUrl } from '../../store/actions';
import { IInputConfig } from '../../components/UI/Input/types';
import { useForm } from '../../shared/CustomHooks';

export interface IAuthState {
  authFormData: {
    name: IInputConfig;
    password: IInputConfig;
    email: IInputConfig;
  };
  isSignUp: boolean;
  readonly redirectUrl: string;
}
const Auth: FC<IAuthProps> = props => {
  const [formState, setForm] = useForm('email', 'password', 'name');
  const [isSignUp, setIsSignup] = useState(false);
  const [redirectUrl] = useState(props.redirectUrl);
  // const [submitSuccess, setSubmitSuccess,] = useState(false);
  const { email, password } = formState;
  useEffect(() => {
    props.setAuthRedirectUrl('/');
  }, []);

  useLayoutEffect(() => {
    // tslint:disable-next-line: no-unused-expression
    props.isAuth && props.history.push(redirectUrl);
  });

  const authError = props.error ? <p className="error">{props.errorMessage}</p> : null;

  const switchAuthModeHandler = useCallback(() => {
    setIsSignup(prev => !prev);
  }, [setIsSignup]);
  const submitHandler = async (e: MouseEvent) => {
    e.preventDefault();
    props.onAuth(email.value, password.value, isSignUp);
    // setSubmitSuccess(false);
  };
  const mapInputs = useCallback(makeMapToInputs(setForm), []);

  const form = props.authenticating ? (
    <Loader />
  ) : (
    <>
      {authError}
      <p className="info">{isSignUp ? 'SIGNUP' : 'LOGIN'}</p>
      <form>
        {[email, password].map(mapInputs)}
        <Button btnType="Success" onClick={submitHandler}>
          SUBMIT
        </Button>
      </form>
      <Button btnType="Danger" onClick={switchAuthModeHandler}>
        SWITCH TO {isSignUp ? 'LOGIN' : 'SIGNUP'}
      </Button>
    </>
  );
  return (
    <StyledAuth>
      <div>{form}</div>
    </StyledAuth>
  );
};

const mapAuthStateToProps = (state: Store) => {
  return {
    authenticating: selectAuthAuthenticating(state),
    error: selectAuthError(state),
    errorMessage: getAuthErrorMessage(state),
    // purchasable: getPurchaseableFromStore(state),
    redirectUrl: selectAuthRedirectUrl(state),
    isAuth: getAuthenticated(state),
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
