import { AxiosInstance } from 'axios';
import React, { Component } from 'react';
import Modal from '../components/UI/Modal/Modal';

export interface AxiosErrorBoundaryProps {
  axios: AxiosInstance;
}

export interface AxiosErrorBoundaryState {
  error: null | Error;
}

class AxiosErrorBoundary extends Component<AxiosErrorBoundaryProps, AxiosErrorBoundaryState> {
  constructor(props: AxiosErrorBoundaryProps) {
    super(props);

    this.state = {
      error: null,
    };
  }
  public componentDidMount = () => {
    this.props.axios.interceptors.request.use(
      req => {
        this.setState({ error: null });
        return req;
      },
      error => {
        throw error;
      },
    );

    this.props.axios.interceptors.response.use(
      res => res,
      error => {
        this.setState({ error });
        throw error;
      },
    );
  };

  public errorConfirmed = () => {
    this.setState({ error: null });
  };

  public render() {
    return (
      <>
        {this.state.error ? (
          <Modal show={!!this.state.error} hider={this.errorConfirmed}>
            {this.state.error.message}
          </Modal>
        ) : null}
        {this.props.children}
      </>
    );
  }
}

export default AxiosErrorBoundary;
