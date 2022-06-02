import React from 'react';
import NextLink from 'next/link';
import { Box, Container, Stack, Text, Link } from '@chakra-ui/react';

import { NAV_ITEMS } from '../utils/constants';

function Footer(props) {
  return (
    <Box bg="gray.800" color="white" {...props}>
      <Container
        as={Stack}
        maxW="6xl"
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© The Path. All rights reserved</Text>
        <Stack direction="row" spacing={6}>
          {NAV_ITEMS.map((navItem) => (
            <Box key={navItem.label}>
              {/* Using NextLink here causes some weird behaviour with the styles of the popover */}
              <NextLink href={navItem.href ?? '#'} passHref>
                <Link
                  p={2}
                  fontSize={'sm'}
                  href={navItem.href ?? '#'}
                  fontWeight={500}
                  colorScheme={'primary'}
                >
                  {navItem.label}
                </Link>
              </NextLink>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
