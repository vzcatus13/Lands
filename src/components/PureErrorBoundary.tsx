import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class PureErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    document.title = 'Error | Lands';
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Error!!11!1</h1>
          <h2>Reload this page in 15 minutes</h2>
        </>
      );
    }

    return this.props.children;
  }
}

export default PureErrorBoundary;
