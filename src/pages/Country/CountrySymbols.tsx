import { Stack, Image } from '@chakra-ui/react';
import { Country } from '../../types';

const CountrySymbols = ({ data }: { data?: Country }) => {
  const [name = '', flagSrc = '', coatOfArmsSrc = ''] = [
    data?.name.common,
    data?.flags?.svg,
    data?.coatOfArms?.svg,
  ];

  return (
    <Stack direction="row" spacing="24px">
      <Image
        src={flagSrc}
        h={['100px', '170px']}
        w="auto"
        loading="lazy"
        alt={`Flag of ${name}`}
      />
      <Image
        src={coatOfArmsSrc}
        h={['100px', '170px']}
        w="auto"
        loading="lazy"
        alt={`Color of arms of ${name}`}
      />
    </Stack>
  );
};

export default CountrySymbols;
