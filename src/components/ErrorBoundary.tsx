import React from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';
import Twemoji from './Twemoji';
import { Link as RouterLink } from 'react-router-dom';

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
