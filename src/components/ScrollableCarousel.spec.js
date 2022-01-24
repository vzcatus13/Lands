import { Box, Flex, ChakraProvider, theme } from '@chakra-ui/react';
import { mount } from '@cypress/react';
import ScrollableCarousel from './ScrollableCarousel';

describe('Scrollable Carousel', () => {
  beforeEach(() => {
    cy.viewport(500, 500);
  });

  it('should display buttons correctly when content overflows', () => {
    mount(
      <ChakraProvider theme={theme}>
        <ScrollableCarousel>
          <Flex>
            <Box h="500px" w="500px" flexShrink="0" />
            <Box h="500px" w="500px" flexShrink="0" />
            <Box h="500px" w="500px" flexShrink="0" />
            <Box h="500px" w="500px" flexShrink="0" />
          </Flex>
        </ScrollableCarousel>
      </ChakraProvider>
    );

    // testing-library's getByRole with hidden:true doesn't seem to find hidden elements correctly by name
    // (https://github.com/testing-library/dom-testing-library/issues/846)

    // starting position of container, container hasn't been scrolled
    cy.findByLabelText(/previous/i, { selector: 'button' }).should(
      'not.be.visible'
    );
    cy.findByLabelText(/next/i, { selector: 'button' }).should('be.visible');

    // scroll right by 100px
    cy.findByTestId('scrollable-container').scrollTo(100, 0);
    cy.findByLabelText(/previous/i, { selector: 'button' }).should(
      'be.visible'
    );
    cy.findByLabelText(/next/i, { selector: 'button' }).should('be.visible');

    // scroll to the right-end of container
    cy.findByTestId('scrollable-container').scrollTo('right');
    cy.findByLabelText(/previous/i, { selector: 'button' }).should(
      'be.visible'
    );
    cy.findByLabelText(/next/i, { selector: 'button' }).should(
      'not.be.visible'
    );
  });

  it('should hide buttons when content does not overflow', () => {
    mount(
      <ChakraProvider theme={theme}>
        <ScrollableCarousel>
          <Box h="500px" w="500px" />
        </ScrollableCarousel>
      </ChakraProvider>
    );

    cy.findByLabelText(/previous/i, { selector: 'button' }).should(
      'not.be.visible'
    );
    cy.findByLabelText(/next/i, { selector: 'button' }).should(
      'not.be.visible'
    );
  });

  it('buttons should be positioned correctly', () => {
    const buttonSize = 19;
    const innerContainerHeight = 500;
    mount(
      <ChakraProvider theme={theme}>
        <ScrollableCarousel buttonSize={buttonSize}>
          <Box h={`${innerContainerHeight}px`} w="500px" />
        </ScrollableCarousel>
      </ChakraProvider>
    );

    cy.findByLabelText(/previous/i, { selector: 'button' }).should(
      'have.css',
      'left',
      `${buttonSize}px`
    );
    cy.findByLabelText(/next/i, { selector: 'button' }).should(
      'have.css',
      'right',
      `${buttonSize}px`
    );

    cy.findByLabelText(/previous/i, { selector: 'button' }).should(
      'have.css',
      'top',
      `${innerContainerHeight / 2 - buttonSize}px`
    );
    cy.findByLabelText(/next/i, { selector: 'button' }).should(
      'have.css',
      'top',
      `${innerContainerHeight / 2 - buttonSize}px`
    );
  });

  it('buttons should change scroll coordinates correctly', () => {
    mount(
      <ChakraProvider theme={theme}>
        <ScrollableCarousel>
          <Flex>
            <Box h="500px" w="500px" flexShrink="0" />
            <Box h="500px" w="500px" flexShrink="0" />
            <Box h="500px" w="500px" flexShrink="0" />
          </Flex>
        </ScrollableCarousel>
      </ChakraProvider>
    );

    cy.findByLabelText(/next/i, { selector: 'button' }).click();
    cy.findByTestId('scrollable-container').should(
      'have.prop',
      'scrollLeft',
      500
    );

    cy.findByLabelText(/next/i, { selector: 'button' }).click();
    cy.findByTestId('scrollable-container').should(
      'have.prop',
      'scrollLeft',
      1000
    );

    cy.findByLabelText(/previous/i, { selector: 'button' }).click();
    cy.findByTestId('scrollable-container').should(
      'have.prop',
      'scrollLeft',
      500
    );
  });
});
