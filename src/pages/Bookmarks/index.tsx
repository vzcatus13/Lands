import { Heading, Box } from '@chakra-ui/react';
import BookmarkTable from './BookmarkTable';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { selectBookmarks } from '../../slices/bookmarksSlice';

const Bookmarks = () => {
  const bookmarks = useSelector(selectBookmarks);

  useEffect(() => {
    document.title = 'Bookmarks | Lands';
  }, []);

  return (
    <Box mx={{ base: '8px', md: '80px' }} my="16px">
      <Heading size="xl" marginBottom="20px">
        Your bookmarks
      </Heading>
      {bookmarks.length === 0 ? (
        <Heading size="lg">You don't have bookmarks yet</Heading>
      ) : (
        <BookmarkTable bookmarks={bookmarks} />
      )}
    </Box>
  );
};

export default Bookmarks;
