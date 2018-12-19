import * as React from 'react';
import Retry from '../components/Retry/Retry';

export interface IErrorBoundaryState {
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<
  {},
  IErrorBoundaryState
> {
  public static getDerivedStateFromError(error: Error) {
    return { error };
  }
  constructor(props: {}) {
    super(props);

    this.state = {
      error: null,
    };
  }

  public render() {
    return (
      <>
        {this.state.error ? (
          <Retry
            retryHandler={this.retry}
            additionalInfo={this.state.error.message}
          />
        ) : (
          this.props.children
        )}
      </>
    );
  }

  private retry = () => {
    this.setState({ error: null });
  };
}
