import { useGetCountry } from '../../queries/api';
import { Flex, Grid, GridItem, Skeleton, SkeletonText } from '@chakra-ui/react';
import Header from './Header';
import CountrySymbols from './CountrySymbols';
import MainInfo from './MainInfo';
import BorderCountries from './BorderCountries';
import Map from './Map';
import Photos from './Photos';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import BookmarkButton from './BookmarkButton';

const Country = () => {
  const { countryCode } = useParams();
  const { data, isLoading } = useGetCountry(countryCode);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Lands';
  }, []);

  useEffect(() => {
    if (data?.name.common !== undefined) {
      document.title = data.name.common + ' | Lands';
    }
  }, [data]);

  return (
    <>
      <Grid
        gridTemplateColumns="repeat(2, 1fr)"
        gridTemplateRows="repeat(5, 1ft)"
        rowGap="20px"
        columnGap="20px"
        mx={['10px', '20px', '40px']}
      >
        <GridItem
          colSpan={[2, null, 1]}
          rowSpan={1}
          borderBottom={isLoading ? '0' : '1px'}
          borderColor="gray.500"
          paddingBottom={['20px', null, 0]}
        >
          <Skeleton w={['100%', '80%']} h="60%" isLoaded={!isLoading}>
            <Header data={data} />
          </Skeleton>
        </GridItem>
        <GridItem
          as={Flex}
          colSpan={[2, null, 1]}
          rowSpan={1}
          gridRowStart={1}
          gridColumnStart={[1, null, 2]}
          justifyContent="center"
        >
          {isLoading ? (
            <Skeleton w="80%" borderRadius="10px" isLoaded={!isLoading} />
          ) : (
            <CountrySymbols data={data} />
          )}
        </GridItem>
        <GridItem colSpan={[2, null, 1]} rowSpan={1}>
          <SkeletonText
            noOfLines={6}
            spacing={['10px', '15px']}
            isLoaded={!isLoading}
          >
            <MainInfo data={data} />
            <BookmarkButton countryCode={countryCode} marginTop="10px" />
          </SkeletonText>
        </GridItem>
        <GridItem colSpan={[2, null, 1]} rowSpan={2}>
          <Skeleton isLoaded={!isLoading}>
            <Map data={data} />
          </Skeleton>
        </GridItem>
        <GridItem colSpan={[2, null, 1]} rowSpan={1}>
          {isLoading ? (
            <Skeleton h={['100px', '300px']} borderRadius="10px" />
          ) : (
            <BorderCountries data={data} />
          )}
        </GridItem>
        <GridItem colSpan={2} rowSpan={1} paddingBottom="20px">
          {isLoading ? (
            <Skeleton w="100%" h={['300px', null, '200px']} />
          ) : (
            <Photos data={data} />
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default Country;
