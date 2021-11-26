import React, { ReactNode } from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';
import Twemoji from './Twemoji';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public componentDidUpdate(prevProps: Props): void {
    if (prevProps.children !== this.props.children) {
      this.setState({ hasError: false });
    }
  }

  public static getDerivedStateFromError(_: Error): State {
    document.title = 'Error | Lands';
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          h="50vh"
        >
          <Flex direction="row" alignItems="center">
            <Text fontSize="2xl">Something went wrong</Text>
            <Twemoji emoji="😔" boxSize={{ base: 9, md: 6 }} marginStart={3} />
          </Flex>
          <Link fontSize="2xl" as={RouterLink} to="/">
            Go Home
          </Link>
        </Flex>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
