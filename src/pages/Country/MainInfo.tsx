import { Stack, Tag, Text } from '@chakra-ui/react';

const MainInfo = ({ data }) => {
  const [
    independent = false,
    unMember = false,
    capital = [],
    languages = {},
    population = 0,
    area = 0,
    currencies = {},
  ] = [
    data?.independent,
    data?.unMember,
    data?.capital,
    data?.languages,
    data?.population,
    data?.area,
    data?.currencies,
  ];

  return (
    <>
      <Stack direction="row" marginBottom="2">
        <Tag
          colorScheme={independent ? 'green' : 'red'}
          textTransform="uppercase"
        >
          {independent ? 'Independent' : 'Dependent'}
        </Tag>
        <Tag colorScheme={unMember ? 'green' : 'red'} textTransform="uppercase">
          {unMember ? 'UN member' : "Isn't UN member"}
        </Tag>
      </Stack>
      <Stack direction="row">
        <Text fontSize="lg" fontWeight="bold">
          Capital:
        </Text>
        <Text fontSize="lg">{capital.join(', ')}</Text>
      </Stack>
      <Stack direction="row">
        <Text fontSize="lg" fontWeight="bold">
          Official Languages:
        </Text>
        <Text fontSize="lg">{Object.values(languages).join(', ')}</Text>
      </Stack>
      <Stack direction="row">
        <Text fontSize="lg" fontWeight="bold">
          Population:
        </Text>
        <Text fontSize="lg">{population}</Text>
      </Stack>
      <Stack direction="row">
        <Text fontSize="lg" fontWeight="bold">
          Area:
        </Text>
        <Text fontSize="lg">{area} km²</Text>
      </Stack>
      <Stack direction="row">
        <Text fontSize="lg" fontWeight="bold">
          Official Currencies:
        </Text>
        <Text fontSize="lg">
          {Object.values(currencies)
            .map(currency => `${currency.name} (${currency.symbol})`)
            .join(', ')}
        </Text>
      </Stack>
    </>
  );
};

export default MainInfo;
