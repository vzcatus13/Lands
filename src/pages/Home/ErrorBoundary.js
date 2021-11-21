import React from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';
import Twemoji from '../../components/Twemoji';

class ErrorBoundary extends React.Component {
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
