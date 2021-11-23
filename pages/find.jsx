import React, { useState } from 'react';
import {
  Button,
  Container,
  VStack,
  Heading,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Spacer,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
import { PathFormProvider } from '../state';
import ServiceTypeCard from '../components/ServiceTypeCard';
import { MdNightShelter, MdLocationOn } from 'react-icons/md';
import PathFormItem from '../components/PathFormItem';
import LocationInput from '../components/LocationInput';

function Find() {
  return (
    <PathFormProvider>
      <Container maxW="container.lg" mt={8}>
        <PathFormItem
          title="Where are you located?"
          description="Enter the address of you, or a person you are trying to help. Or use your current location."
        >
          <LocationInput
            label="Street Address"
            placeholder="1234 S Main St, Portland OR"
            onLocationChange={() => {}}
          />
        </PathFormItem>
        {/* <VStack w="full" bg="gray.100" borderRadius={'md'} p={8}>
          <Box w="full" mb={4}>
            <Heading as="h1" size="lg">
              Where are you located?
            </Heading>
            <Text fontSize="md" textColor="gray.600">
              Enter the address of you, or a person you are trying to help. Or use your current
              location.
            </Text>
          </Box>
          <Box w="full">
            <FormControl>
              <FormLabel>Street Address</FormLabel>
              <Input placeholder="1234 S Main St, Portland OR" bg="white" />
            </FormControl>
            <Button leftIcon={<MdLocationOn />} colorScheme="primary" px={8} mt={4}>
              Use my current location
            </Button>
          </Box>
        </VStack> */}

        <VStack w="full" bg="gray.100" borderRadius={'md'} p={8} mt={12}>
          <Box w="full" mb={4}>
            <Heading as="h1" size="lg">
              What services are you looking for?
            </Heading>
            <Text fontSize="md" textColor="gray.600">
              Select a service type to search for near your area.
            </Text>
          </Box>
          <Box borderRadius={'md'} p={4} w="full">
            <SimpleGrid columns={{ base: 1, md: 3 }} columnGap={8} rowGap={6} w="full">
              <GridItem w="full" h="full">
                <ServiceTypeCard title="Hello World" icon={<MdNightShelter />} />
              </GridItem>
              <GridItem w="full" h="full">
                <ServiceTypeCard title="Hello World" icon={<MdNightShelter />} />
              </GridItem>
              <GridItem w="full" h="full">
                <ServiceTypeCard title="Hello World" icon={<MdNightShelter />} />
              </GridItem>
              <GridItem w="full" h="full">
                <ServiceTypeCard title="Hello World" icon={<MdNightShelter />} />
              </GridItem>
              <GridItem w="full" h="full">
                <ServiceTypeCard title="Hello World" icon={<MdNightShelter />} />
              </GridItem>
              <GridItem w="full" h="full">
                <ServiceTypeCard title="Hello World" icon={<MdNightShelter />} />
              </GridItem>
              <GridItem w="full" h="full">
                <ServiceTypeCard title="Hello World" icon={<MdNightShelter />} />
              </GridItem>
              <GridItem w="full" h="full">
                <ServiceTypeCard title="Hello World" icon={<MdNightShelter />} />
              </GridItem>
              <GridItem w="full" h="full">
                <ServiceTypeCard title="Hello World" icon={<MdNightShelter />} />
              </GridItem>
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </PathFormProvider>
  );
}

export default Find;
