import { Box, Heading } from '@chakra-ui/react';
import GoogleMap from '../../components/GoogleMap';
import { Country } from '../../types';

const Map = ({ data }: { data?: Country }) => {
  const [capitalLat = 0, capitalLng = 0, name = ''] = [
    data?.capitalInfo?.latlng[0],
    data?.capitalInfo?.latlng[1],
    data?.name.common,
  ];

  return (
    <Box mx={[0, '20px', '40px']}>
      <Heading size="lg" marginBottom="10px">
        {name} on the Map
      </Heading>
      <Box h={['400px', '500px']}>
        <GoogleMap
          styles={{ borderRadius: '0px' }}
          options={{ zoom: 5, disableDefaultUI: true }}
          center={{ lat: capitalLat, lng: capitalLng }}
        />
      </Box>
    </Box>
  );
};

export default Map;
