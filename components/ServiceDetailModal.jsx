import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Heading,
} from '@chakra-ui/react';
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
  const { opening_hours: { weekday_text, isOpen: isLocationOpen } = {} } = service;
  const dayRef = useRef(getCurrentDay());

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
          <Text mb={8}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nostrum ipsum omnis
            veniam placeat explicabo tempora aspernatur nihil provident ratione, commodi, earum
            suscipit adipisci laborum obcaecati vel. Illum, fuga odit!
          </Text>
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
