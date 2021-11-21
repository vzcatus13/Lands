import {
  Box,
  Stack,
  useBreakpointValue,
  Image,
  Skeleton,
  Heading,
  Link,
} from '@chakra-ui/react';
import ScrollableCarousel from '../../components/ScrollableCarousel';
import { useSearchForPhotos } from '../../queries/api';

const Photos = ({
  data: {
    name: { common },
  },
}) => {
  const { data, isLoading, isError } = useSearchForPhotos({
    query: common,
    perPage: 20,
    orientation: 'landscape',
  });

  const isButtonsHidden = useBreakpointValue({ base: true, lg: false });

  return !isError ? (
    <>
      <Heading size="lg" marginBottom="10px">
        Images of {common}
      </Heading>
      <ScrollableCarousel
        hideButtons={isButtonsHidden || isLoading}
        disableScroll={isLoading}
      >
        <Stack direction="row" spacing="5px" borderRadius="8px">
          {!isLoading &&
            data.results.map(d => {
              return (
                <Box
                  as="a"
                  href={d.links.html}
                  target="_blank"
                  key={d.id}
                  flexShrink="0"
                  _first={{
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                  }}
                  _last={{
                    borderTopRightRadius: '8px',
                    borderBottomRightRadius: '8px',
                  }}
                >
                  <Image
                    src={d.urls.regular}
                    backgroundColor={d.color}
                    h={['170px', null, '300px']}
                    w={['250px', null, '500px']}
                    objectFit="cover"
                    loading="lazy"
                    alt={d.alt_description}
                    borderRadius="inherit"
                  />
                </Box>
              );
            })}

          {isLoading &&
            new Array(10).fill().map((_, i) => {
              return (
                <Skeleton
                  key={i}
                  flexShrink="0"
                  h={['170px', null, '300px']}
                  w={['250px', null, '500px']}
                />
              );
            })}
        </Stack>
      </ScrollableCarousel>
      <Box marginTop="5px">
        <Link isExternal href={`https://unsplash.com/s/photos/${common}`}>
          View more images | Unsplash
        </Link>
      </Box>
    </>
  ) : null;
};

export default Photos;
