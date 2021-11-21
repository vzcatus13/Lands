import React from 'react';

class PureErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
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
