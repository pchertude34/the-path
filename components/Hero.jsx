import { Container, Button, Flex, Heading, Image, Stack, Text, Box } from '@chakra-ui/react';

export default function Hero() {
  return (
    <Container maxW={'7xl'}>
      <Stack
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: 'column', md: 'row' }}
      >
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: '20%',
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'primary.500',
                  zIndex: -1,
                }}
              >
                From surviving,
              </Text>
              <br />
              <Text as={'span'} position={'relative'} color={'primary.500'}>
                to Thrivingggg
              </Text>
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }}>
              Plaid commodo vegan meh. Flexitarian mustache before they sold out ethical. Air plant
              neutra yuccie iPhone beard succulents hella adaptogen pug pour-over actually sunt
              laboris ad asymmetrical.
            </Text>
            <Button colorScheme={'primary'} w={{ base: '100%', md: '70%' }}>
              Find Your Path
            </Button>
          </Stack>
        </Flex>
        <Flex flex={1} justify={'center'} align={'center'} position={'relative'} w={'full'}>
          <Box
            position={'relative'}
            height={'300px'}
            rounded={'lg'}
            boxShadow={'2xl'}
            overflow={'hidden'}
            width={'full'}
          >
            <Image
              alt={'The Path'}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={'100%'}
              src={'/the-path-hero.jpg'}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}
