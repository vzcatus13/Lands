import { Icon, ChakraProps } from '@chakra-ui/react';

const BookmarkRemove = (props: ChakraProps) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M21 7h-6V5h6v2zm-2 3.9A5.002 5.002 0 0 1 14 3H7c-1.1 0-2 .9-2 2v16l7-3l7 3V10.9z"
      />
    </Icon>
  );
};

export default BookmarkRemove;
