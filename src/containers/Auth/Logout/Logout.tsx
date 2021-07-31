import { FC } from "react";
import { Redirect } from "react-router-dom";
import { onAuthLogout } from "../../../store/actions";
import { connect } from "react-redux";
import { GetConnectProps } from "../../../store/types";

const Logout: FC<LogoutProps> = ({ onLogout }) => {
  onLogout();
  return <Redirect to="/" />;
};

const mapLogoutDispatchToProps = {
  onLogout: onAuthLogout,
};

const connectLogout = connect(null, mapLogoutDispatchToProps);

type LogoutProps = GetConnectProps<typeof connectLogout>;

export default connectLogout(Logout);
