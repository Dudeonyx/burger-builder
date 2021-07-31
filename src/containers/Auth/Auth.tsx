import Button from "../../components/UI/Button/Button";
import {
  MouseEvent,
  useEffect,
  FC,
  useCallback,
  useLayoutEffect,
  useReducer,
} from "react";
import { makeMapToInputs } from "../../components/UI/Input/";
import { authenticate } from "../../store/actions";
// import { connect } from 'react-redux';
// import { GetConnectProps, Store } from '../../store/';
import { RouteComponentProps } from "react-router";
import {
  selectAuthAuthenticating,
  selectAuthError,
  getAuthErrorMessage,
  selectAuthRedirectUrl,
  getAuthenticated,
} from "../../store/selectors/";
import Loader from "../../components/UI/Loader/Loader";
import { StyledAuth } from "./Auth.styles";
import { setAuthRedirectUrl } from "../../store/actions";
import { useForm, useRedux } from "../../shared/CustomHooks";
import { Store } from "../../store";
const mapAuthStateToProps = (state: Store) => {
  return {
    authenticating: selectAuthAuthenticating(state),
    error: selectAuthError(state),
    errorMessage: getAuthErrorMessage(state),
    // purchasable: getPurchaseableFromStore(state),
    initialRedirectUrl: selectAuthRedirectUrl(state),
    isAuth: getAuthenticated(state),
  };
};
const mapAuthDispatchToProps = {
  onAuth: authenticate,
  setAuthRedirectUrl,
};

const Auth: FC<IAuthProps> = (props) => {
  const [
    { authenticating, error, isAuth, errorMessage, initialRedirectUrl },
    { setAuthRedirectUrl, onAuth },
  ] = useRedux(mapAuthStateToProps, mapAuthDispatchToProps);
  const [isSignUp, setIsSignup] = useReducer((s) => !s, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const redirectUrl = initialRedirectUrl;
  const [formState, setForm] = useForm("email", "password", "name");
  const { email, password } = formState;
  useEffect(() => {
    setAuthRedirectUrl("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    // tslint:disable-next-line: no-unused-expression
    isAuth && props.history.push(redirectUrl);
  });

  const authError = error ? <p className="error">{errorMessage}</p> : null;

  const submitHandler = async (e: MouseEvent) => {
    e.preventDefault();
    onAuth(email.value, password.value, isSignUp);
    // setSubmitSuccess(false);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const mapInputs = useCallback(makeMapToInputs(setForm), []);

  const form = authenticating ? (
    <Loader />
  ) : (
    <>
      {authError}
      <p className="info">{isSignUp ? "SIGNUP" : "LOGIN"}</p>
      <form>
        {[email, password].map(mapInputs)}
        <Button btnType="Success" onClick={submitHandler}>
          SUBMIT
        </Button>
      </form>
      <Button btnType="Danger" onClick={setIsSignup}>
        SWITCH TO {isSignUp ? "LOGIN" : "SIGNUP"}
      </Button>
    </>
  );
  return (
    <StyledAuth>
      <div>{form}</div>
    </StyledAuth>
  );
};

// const connectAuth = connect(
//   mapAuthStateToProps,
//   mapAuthDispatchToProps,
// );

type IAuthProps = RouteComponentProps;

export default Auth;
