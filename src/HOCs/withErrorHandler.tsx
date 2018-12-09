import { AxiosInstance } from 'axios';
import React, { Component, ComponentType, lazy } from 'react';

const Modal = lazy(() =>
  import(/* webpackChunkName: "Modal" */ '../components/UI/Modal/Modal')
);

export interface IWithErrorHandlerState {
  error: Error | null;
}

/** @template P
 * @param {ComponentType<P>} WrappedComponent
 * @param {AxiosInstance} axios
 * @returns
 */
function withErrorHandler<P extends {}>(
  WrappedComponent: ComponentType<P>,
  axios: AxiosInstance
) {
  return class WithErrorHandler extends Component<P> {
    public state: IWithErrorHandlerState = {
      error: null
    };

    private req: number | null = null;

    private res: number | null = null;

    public componentWillMount() {
      this.req = axios.interceptors.request.use(
        req => {
          this.setState({ error: null });
          return req;
        },
        error => {
          throw error;
        }
      );
      this.res = axios.interceptors.response.use(
        req => req,
        error => {
          this.setState({ error });
          throw error;
        }
      );
    }

    public componentWillUnmount() {
      if (this.req !== null) {
        axios.interceptors.request.eject(this.req);
      }
      if (this.res !== null) {
        axios.interceptors.response.eject(this.res);
      }
    }

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
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
}

export default withErrorHandler;
