import { Icon, ChakraProps } from '@chakra-ui/react';

const Bookmark = (props: ChakraProps) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3l7 3V5c0-1.1-.9-2-2-2z"
      />
    </Icon>
  );
};

export default Bookmark;
