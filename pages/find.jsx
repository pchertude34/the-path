import React, { useRef } from 'react';
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Button,
  Divider,
} from '@chakra-ui/react';
import FormCard from '../components/FormCard';

function Find() {
  const addressInputRef = useRef();

  function calculateLocation() {
    navigator.geolocation.getCurrentPosition((position) => {});
  }

  return (
    <FormCard>
      <VStack w="full" h="full" p={10} spacing={{ base: 4, md: 10 }} alignItems="center">
        <Heading as="h1" size="xl" textAlign="center">
          Welcome to The Path!
        </Heading>
        <Text fontSize="lg">First things first, where are you located?</Text>
        <Divider />
        <Container>
          <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>Street Address</FormLabel>
                <Input placeholder="123 S Main St" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input ref={addressInputRef} placeholder="Portland" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>State</FormLabel>
                <Input placeholder="Oregon" />
              </FormControl>
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Zip</FormLabel>
                <Input placeholder="12345" />
              </FormControl>
            </GridItem>
          </SimpleGrid>
        </Container>
        <Text>Or</Text>
        <Button colorScheme="secondary" px={8} onClick={calculateLocation}>
          Use my current location
        </Button>
      </VStack>
    </FormCard>
  );
}

export default Find;
