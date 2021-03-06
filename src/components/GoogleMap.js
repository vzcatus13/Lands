import { Skeleton } from '@chakra-ui/skeleton';
import { useJsApiLoader, GoogleMap as Map } from '@react-google-maps/api';
import { memo } from 'react';
import { isEqual } from 'lodash';

const GoogleMap = ({ styles, center = { lat: 0, lng: 0 }, options = {} }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
  });

  const renderMap = () => {
    return (
      <Map
        options={{
          ...options,
          center,
        }}
        mapContainerStyle={{
          width: '100%',
          height: '100%',
          ...styles,
        }}
      />
    );
  };

  return isLoaded ? (
    renderMap()
  ) : (
    <Skeleton width="100%" height="100%" style={{ ...styles }} />
  );
};

export default memo(GoogleMap, isEqual);
