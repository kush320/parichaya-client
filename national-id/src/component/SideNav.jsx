import {
    IconButton,
    Avatar,
    Box,
    Center,
    CloseButton,
    Flex,
    HStack,
    VStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
    FiPlusCircle,
    FiSettings,
    FiMenu,
    FiBell,
    FiChevronDown,
    FiUser
} from 'react-icons/fi';
import emblem from '../assets/emblem.png';

import { NavLink, useLocation } from 'react-router-dom';
const LinkItems = [
    { name: 'Home', icon: FiHome, route: '/' },
    { name: 'National ID', icon: FiPlusCircle, route: '/nid/register' },
    { name: 'Citizenship', icon: FiPlusCircle, route: '/ctz/register' },
    { name: 'Driving License', icon: FiPlusCircle, route: '/dvl/register' },
];

export default function SidebarWithHeader({
    children,
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4" >
                {children}
            </Box>
        </Box>
    );
}



const SidebarContent = ({ onClose, ...rest }) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex height={32} alignItems="center" mx="8" my='4' justifyContent="space-between">

                <Box>
                    <Center width={'100%'}>
                        <img src={emblem} alt="" height={'auto'} width='80' />
                    </Center>
                    <Center>


                        <Text fontSize="2xl" fontWeight="bold" color={'#0a81ff'}>
                            Parichaya
                        </Text>
                    </Center>
                    <Center>

                        <Text color={'#0a81ff'}>
                            Karmachari Client
                        </Text>
                    </Center>
                </Box>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} route={link.route}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};


const NavItem = ({ icon, route, children, ...rest }) => {
    const location = useLocation()
    const color = location.pathname === route ? 'white' : 'black'
    const bg_color = location.pathname === route ? '#0a81ff' : 'white'
    const hover_color = location.pathname === route ? '#white' : '#black'
    const hover_bg_color = location.pathname === route ? '#0a81ff' : '#E4F0FF'


    return (

        <NavLink to={route} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                color={color}
                background={bg_color}
                // style={style}
                _hover={{
                    bg: hover_bg_color,
                    color: hover_color,
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: hover_color,
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </NavLink>
    );
};


const MobileNav = ({ onOpen, ...rest }) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Parichaya
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>

                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}>
                            <HStack>
                                <IconButton
                                    size="lg"
                                    variant="ghost"
                                    aria-label="open menu"
                                    icon={<FiUser />}
                                />

                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">Ram Lal</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        District Administrative Officer
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            {/* <MenuItem>Profile</MenuItem> */}
                            {/* <MenuItem>Settings</MenuItem> */}
                            {/* <MenuItem>Billing</MenuItem> */}
                            {/* <MenuDivider /> */}
                            <MenuItem onClick={() => {
                                localStorage.removeItem("token");
                                window.location.reload()
                            }}>Log out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack >
        </Flex >
    );
};