import * as React from 'react';

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
      <>{this.state.error ? this.state.error.message : this.props.children}</>
    );
  }
}
