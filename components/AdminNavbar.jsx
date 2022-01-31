import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useSession, signOut } from 'next-auth/react';

export default function WithSubnavigation() {
  const { data: session, status } = useSession();

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'left', md: 'start' }}
          alignItems="center"
          ml={{ base: 1, md: 0 }}
          mr={{ base: 0, md: 4 }}
        >
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontWeight={800}
          >
            The Path
          </Text>
        </Flex>
        {session && (
          <Menu>
            <MenuButton as={Button} rounded={'full'} variant="link" cursor="pointer">
              <Avatar size={'sm'} image={session.user.image} />
            </MenuButton>
            <MenuList>
              <MenuItem color="red.600" onClick={() => signOut({ callbackUrl: '/' })}>
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Box>
  );
}
