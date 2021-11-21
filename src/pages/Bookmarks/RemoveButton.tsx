import { IconButton, useToast } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { BookmarkRemove } from '../../components/icons';
import { remove } from '../../slices/bookmarksSlice';
import { useEffect, useState } from 'react';

const RemoveButton = ({ countryCode = '', ...props }) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const onRemove = () => {
    setIsLoading(true);
    dispatch(remove(countryCode)).then(() => {
      toast({
        title: 'Bookmark removed',
        description: 'Bookmark has been successfully removed',
        status: 'success',
        duration: 3000,
        isClosable: false,
      });
    });
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <IconButton
      w="48px"
      h="48px"
      fontSize="24px"
      variant="solid"
      colorScheme="red"
      isLoading={isLoading}
      aria-label="Remove Bookmark"
      icon={<BookmarkRemove />}
      onClick={onRemove}
      {...props}
    />
  );
};

export default RemoveButton;
