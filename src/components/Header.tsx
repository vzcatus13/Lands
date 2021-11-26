import { Flex, Stack, IconButton } from '@chakra-ui/react';
import ColorModeSwitcher from './ColorModeSwitcher';
import { IoMdHome } from 'react-icons/io';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Bookmark } from './icons';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Flex
      justifyContent="space-between"
      paddingLeft="5px"
      paddingRight="10px"
      paddingTop="10px"
      marginBottom="15px"
    >
      <Stack direction="row">
        <IconButton
          w="48px"
          h="48px"
          fontSize="24px"
          variant="ghost"
          color="current"
          marginLeft="2"
          aria-label="Go Home"
          icon={<IoMdHome />}
          onClick={() => navigate('/')}
        />
      </Stack>
      <Stack direction="row">
        <IconButton
          as={RouterLink}
          to="/bookmarks"
          aria-label="Go to Bookmarks"
          w="48px"
          h="48px"
          fontSize="24px"
          variant="ghost"
          color="current"
          aria-hidden="true"
          icon={<Bookmark />}
        />
        <ColorModeSwitcher />
      </Stack>
    </Flex>
  );
};

export default Header;
