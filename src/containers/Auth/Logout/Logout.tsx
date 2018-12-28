import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { authLogout } from '../../../store/reducers/actions/AuthActions';
import { connect } from 'react-redux';
import { GetConnectProps } from '../../../store/types';

const Logout: React.SFC<LogoutProps> = ({ onLogout }) => {
  onLogout();
  return <Redirect to="/" />;
};

const mapLogoutDispatchToProps = {
  onLogout: authLogout,
};

const connectLogout = connect(
  null,
  mapLogoutDispatchToProps,
);

type LogoutProps = GetConnectProps<typeof connectLogout>;

export default connectLogout(Logout);
