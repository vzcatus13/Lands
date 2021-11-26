import React, { ReactNode } from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';
import Twemoji from '../../components/Twemoji';

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
          <Text fontSize="2xl">Try to reload this page later</Text>
          <Text fontSize="xl">Reloading doesn't help?</Text>
          <Text fontSize="xl">
            Relax and listen{' '}
            <Link isExternal href="https://www.youtube.com/watch?v=RsEZmictANA">
              willow by Taylor Swift
            </Link>
          </Text>
        </Flex>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
