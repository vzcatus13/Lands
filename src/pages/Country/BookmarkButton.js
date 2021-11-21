import { Button, useToast } from '@chakra-ui/react';
import { BookmarkAdd, BookmarkRemove } from '../../components/icons';
import { useDispatch, useSelector } from 'react-redux';
import { add, remove } from '../../slices/bookmarksSlice';
import { useState } from 'react';

const BookmarkButton = ({ countryCode, ...props }) => {
  const dispatch = useDispatch();
  const isBookmarked = useSelector(state =>
    state.bookmarks.data.includes(countryCode)
  );

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const onRemove = () => {
    setIsLoading(true);
    dispatch(remove(countryCode)).then(() => {
      setIsLoading(false);
      toast({
        title: 'Bookmark removed',
        description: 'Bookmark has been successfully removed',
        status: 'success',
        duration: 3000,
        isClosable: false,
      });
    });
  };

  const onAdd = () => {
    setIsLoading(true);
    dispatch(add(countryCode)).then(() => {
      setIsLoading(false);
      toast({
        title: 'Bookmark added',
        description: 'Bookmark has been successfully added',
        status: 'success',
        duration: 3000,
        isClosable: false,
      });
    });
  };

  return (
    <Button
      colorScheme={isBookmarked ? 'red' : 'green'}
      isLoading={isLoading}
      rightIcon={
        isBookmarked ? (
          <BookmarkRemove fontSize="24px" />
        ) : (
          <BookmarkAdd fontSize="24px" />
        )
      }
      onClick={isBookmarked ? onRemove : onAdd}
      {...props}
    >
      {isBookmarked ? 'Remove from bookmarks' : 'Bookmark this Country'}
    </Button>
  );
};

export default BookmarkButton;
