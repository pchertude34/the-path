import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Heading,
  VStack,
} from '@chakra-ui/react';
import { ExternalLinkIcon, PhoneIcon } from '@chakra-ui/icons';
import BusinessStatusLabel from './BusinessStatusLabel';
import { convertMetersToMiles } from '../utils/utils';

/**
 * Helper function to get the current day, and translate it to google's day pattern,
 * Since in JS Sunday = 0 and Monday = 1, and to google Monday = 0 and Sunday = 6.
 */
function getCurrentDay() {
  let day = new Date().getDay();
  return (day + 6) % 7;
}

function ServiceDetailModal(props) {
  // Modals can be annoying because they are sorta rendered but not rendered at the same time.
  // When the application first loads, our service prop will be undefined. That's why we need to
  // make sure we use optional chaining any time we reference a value on the service prop, and
  // we need defaults any time we destructure the service object.
  const { isOpen, onClose, service = {}, latitude, longitude } = props;
  const {
    opening_hours: { weekday_text, isOpen: isLocationOpen } = {},
    description,
    formatted_phone_number,
    website,
  } = service;
  const dayRef = useRef(getCurrentDay());

  console.log('props', props);

  function generateNavigationLink() {
    let navLink;

    if (service && latitude && longitude) {
      navLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        service.name
      )}&destination_place_id=${encodeURIComponent(service.placeId)}`;
    }
    return navLink;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{service?.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex mb={8}>
            <Text fontWeight="">{service?.address}</Text>
            <Text fontWeight="semibold" ml="auto">
              {convertMetersToMiles(service.distance)} miles
            </Text>
          </Flex>
          <Text mb={8}>{description}</Text>
          {weekday_text && (
            <Box>
              <Flex align="center">
                <Heading as="h2" size="md" decoration="underline" display="inline-block">
                  Hours
                </Heading>
                <BusinessStatusLabel isOpen={isLocationOpen && isLocationOpen()} ml={4} />
              </Flex>
              {weekday_text.map((t, index) => (
                <Text
                  as={dayRef.current === index ? 'mark' : null}
                  fontWeight={dayRef.current === index ? 'bold' : 'regular'}
                  key={index}
                >
                  {t}
                </Text>
              ))}
            </Box>
          )}

          {/* Render the contact information block if there is a website or phone number */}
          {(formatted_phone_number || website) && (
            <VStack mt={8} spacing={1} align="start">
              <Heading as="h2" size="md">
                Contact
              </Heading>

              {formatted_phone_number && (
                <Flex align="center">
                  <PhoneIcon mr={2} />
                  <Link href={`tel:${formatted_phone_number}`} color="blue.600">
                    {formatted_phone_number}
                  </Link>
                </Flex>
              )}

              {website && (
                <Flex align="center">
                  <ExternalLinkIcon mr={2} />
                  <Link href={website} target="_blank" rel="noreferrer noopener" color="blue.600">
                    {website}
                  </Link>
                </Flex>
              )}
            </VStack>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr="auto">
            Close
          </Button>
          <Button
            as="a"
            colorScheme="primary"
            href={generateNavigationLink()}
            target="_blank"
            rel="noreferrer noopener"
          >
            Take Me There
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

ServiceDetailModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default ServiceDetailModal;
