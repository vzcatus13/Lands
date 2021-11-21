import { Box, useColorModeValue } from '@chakra-ui/react';
import { useRef, forwardRef, useState, useEffect } from 'react';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const Button = ({ icon, size, top, isHidden, ...styleProps }) => (
  <Box
    as="button"
    position="absolute"
    height={`${size * 2}px`}
    width={`${size * 2}px`}
    top={`${top}px`}
    zIndex={1}
    display="flex"
    alignItems="center"
    justifyContent="center"
    borderRadius="50%"
    color={useColorModeValue('gray.500', 'gray.400')}
    background={useColorModeValue('white', 'gray.700')}
    boxShadow="0 7px 15px #00000033"
    opacity={isHidden ? '0' : '0.9'}
    transition="opacity 0.5s ease 0s, visibility 0.5s ease 0s"
    _hover={{
      color: useColorModeValue('gray.800', 'gray.300'),
      opacity: 1,
    }}
    visibility={isHidden ? 'hidden' : 'visible'}
    css={{
      WebkitTapHighlightColor: 'transparent',
    }}
    {...styleProps}
  >
    {icon}
  </Box>
);

const ScrollableCarousel = forwardRef(
  (
    {
      children,
      buttonSize = 24,
      disableScroll = false,
      hideButtons = false,
      onScroll,
    },
    ref
  ) => {
    const scrollableContainerRef = useRef();

    const [dimensions, setDimensions] = useState({
      width: 0,
      scrollWidth: 0,
      height: 0,
    });

    const [leftButtonVisibility, setLeftButtonVisibility] = useState(false);
    const [rightButtonVisibility, setRightButtonVisibility] = useState(true);

    const isEnd = (width, scrollWidth, scrollLeft) =>
      Math.floor(scrollWidth - scrollLeft) <= Math.floor(width);

    useEffect(() => {
      if (ref) {
        ref.current = scrollableContainerRef.current;
      }
    }, [scrollableContainerRef, ref]);

    useEffect(() => {
      if (scrollableContainerRef.current) {
        setDimensions({
          width: scrollableContainerRef.current.offsetWidth,
          scrollWidth: scrollableContainerRef.current.scrollWidth,
          height: scrollableContainerRef.current.offsetHeight,
        });
      }
    }, [children]);

    useEffect(() => {
      if (dimensions.scrollWidth <= dimensions.width) {
        setLeftButtonVisibility(false);
        setRightButtonVisibility(false);
      }

      if (dimensions.scrollWidth > dimensions.width) {
        setRightButtonVisibility(true);
      }

      if (scrollableContainerRef.current) {
        if (
          isEnd(
            dimensions.width,
            dimensions.scrollWidth,
            scrollableContainerRef.current.scrollLeft
          )
        ) {
          setRightButtonVisibility(false);
        }

        if (scrollableContainerRef.current.scrollLeft > 0) {
          setLeftButtonVisibility(true);
        }
      }
    }, [dimensions]);

    const handleScroll = e => {
      const { scrollLeft, scrollWidth } = e.target;

      setDimensions(dimensions => {
        if (dimensions.scrollWidth === scrollWidth) return dimensions;

        return {
          ...dimensions,
          scrollWidth: scrollWidth,
        };
      });

      if (scrollLeft > 0) {
        setLeftButtonVisibility(true);
      } else {
        setLeftButtonVisibility(false);
      }

      if (!isEnd(dimensions.width, dimensions.scrollWidth, scrollLeft)) {
        setRightButtonVisibility(true);
      } else {
        setRightButtonVisibility(false);
      }

      onScroll instanceof Function && onScroll(e);
    };

    const scrollLeft = e => {
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollBy({
          left: -dimensions.width,
          behavior: 'smooth',
        });

        scrollableContainerRef.current.scrollLeft <= 0 &&
          setLeftButtonVisibility(false);
      }
    };

    const scrollRight = e => {
      if (scrollableContainerRef.current) {
        scrollableContainerRef.current.scrollBy({
          left: dimensions.width,
          behavior: 'smooth',
        });

        isEnd(
          dimensions.width,
          dimensions.scrollWidth,
          scrollableContainerRef.current.scrollLeft
        ) && setRightButtonVisibility(false);
      }
    };

    return (
      <Box position="relative">
        {!hideButtons && (
          <>
            <Button
              left={`${buttonSize}px`}
              top={dimensions.height / 2 - buttonSize}
              size={buttonSize}
              icon={<VscChevronLeft size={buttonSize} />}
              isHidden={
                !leftButtonVisibility ||
                scrollableContainerRef.current === undefined
              }
              aria-label="Next"
              onClick={scrollLeft}
            />
            <Button
              right={`${buttonSize}px`}
              top={dimensions.height / 2 - buttonSize}
              size={buttonSize}
              icon={<VscChevronRight size={buttonSize} />}
              isHidden={
                !rightButtonVisibility ||
                scrollableContainerRef.current === undefined
              }
              aria-label="Previous"
              onClick={scrollRight}
            />
          </>
        )}
        <Box
          overflowX={disableScroll ? 'hidden' : 'scroll'}
          css={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          onScroll={handleScroll}
          ref={scrollableContainerRef}
        >
          {children}
        </Box>
      </Box>
    );
  }
);

export default ScrollableCarousel;
