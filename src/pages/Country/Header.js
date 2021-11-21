import { Heading, Flex, Text } from '@chakra-ui/react';

const Header = ({ data }) => {
  const [common = '', nativeNames = {}, subregion = ''] = [
    data?.name.common,
    data?.name.nativeName,
    data?.subregion,
  ];
  return (
    <>
      <Heading as="h2" size="2xl">
        {common}
      </Heading>
      <Flex flexWrap="wrap">
        <Heading>
          {Object.values(nativeNames)
            .map(nativeName => nativeName.common)
            .join(' / ')}
        </Heading>
      </Flex>
      <Text fontSize="xl" color="gray.500">
        Country in {subregion}
      </Text>
    </>
  );
};

export default Header;
