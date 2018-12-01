import { AxiosInstance } from 'axios';
import React, { Component, ComponentType } from 'react';
import Modal from '../components/UI/Modal/Modal';
import { IAxiosErrorBoundaryState } from './AxiosErrorBoundary';

export function withErrorHandler<P extends object>(
  WrappedComponent: ComponentType<P>,
  axios: AxiosInstance,
) {
  return class WithErrorHandler extends Component<P> {
    public state: IAxiosErrorBoundaryState = {
      error: null,
    };

    public componentDidMount = () => {
      axios.interceptors.request.use(
        (req) => {
          this.setState({ error: null });
          return req;
        },
        (error) => {
          throw error;
        },
      );
      axios.interceptors.response.use(
        (req) => req,
        (error) => {
          this.setState({ error });
          throw error;
        },
      );
    }

    public errorConfirmed = () => {
      this.setState({ error: null });
    }

    public render() {
      return (
        <>
          <Modal show={!!this.state.error} hider={this.errorConfirmed}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
}
