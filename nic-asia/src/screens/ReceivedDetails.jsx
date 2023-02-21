import { Box, Button, Card, CardBody, Center, Container, Divider, Grid, GridItem, Spinner, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { ReactComponent as PhotoSVG } from '../assets/svg/photo.svg';
import { ReactComponent as FullnameSVG } from '../assets/svg/fullname.svg';
import { ReactComponent as MobileSVG } from '../assets/svg/mobile.svg';
import { ReactComponent as CitizenshipSVG } from '../assets/svg/citizenship.svg';
import { NavLink } from "react-router-dom";

export default function ReceivedDetails({ requestedData }) {
    const photo = requestedData.face_image
    const first_name = requestedData.first_name
    const middle_name = requestedData.middle_name
    const last_name = requestedData.last_name
    let full_name = first_name
    if (middle_name) {
        full_name += ' ' + middle_name

    }
    full_name += ' ' + last_name

    const mobile_number = requestedData.mobile_number
    const ctz_ccn = requestedData.CTZ_CCN
    const ctz_date_of_issue = new Date(requestedData.CTZ_date_of_issue)

    const ctz_issued_district = requestedData.CTZ_issued_district




    return (
        <>
            <div >
                <Container maxW='container.md' my={{ base: 10, lg: 32 }}>


                    <Card borderRadius={15}>

                        <CardBody p={12}>
                            <Center>


                                <Grid
                                    h='100%'
                                    w='100%'
                                    // templateRows='repeat(2, 1fr)'
                                    templateColumns='repeat(2, 1fr)'
                                    gap={4}
                                >
                                    <GridItem colSpan={1} >
                                        <Box pt={10}>
                                            <Text fontWeight={'medium'} fontSize={25}>
                                                NIC Asia Bank Ltd.
                                            </Text>
                                            <Text fontWeight={'light'} fontSize={19}>
                                                is asking you to share:
                                            </Text>
                                            <Box fontSize={16} py={2}>
                                                <Wrap p={2}>
                                                    <PhotoSVG width={30} />
                                                    <Text fontWeight={'bold'}>
                                                        Photo
                                                    </Text>
                                                </Wrap>
                                                <Divider />
                                                <Wrap px={2} pt={2}>


                                                    <FullnameSVG width={30} />

                                                    <Text fontWeight={'bold'}>

                                                        Full Name
                                                    </Text>
                                                </Wrap>
                                                <Box px={12} >
                                                    {full_name}
                                                </Box>
                                                <Divider />
                                                <Wrap px={2} pt={2}>

                                                    <MobileSVG width={30} />
                                                    <Text fontWeight={'bold'}>

                                                        Mobile Number
                                                    </Text>
                                                </Wrap>
                                                <Box px={12} >
                                                    {mobile_number}
                                                </Box>
                                                <Divider />
                                                <Wrap px={2} pt={2}>

                                                    <CitizenshipSVG width={30} />
                                                    <Text fontWeight={'bold'}>
                                                        Citizenship Details
                                                    </Text>
                                                </Wrap>
                                                <Box px={12} >
                                                    CCN.: {ctz_ccn}
                                                </Box>
                                                <Box px={12} >
                                                    Date of Issue: {ctz_date_of_issue.getDate()}
                                                </Box>
                                                <Box px={12} >
                                                    Issued District: {ctz_issued_district}
                                                </Box>
                                                <Divider />
                                            </Box>


                                        </Box>
                                    </GridItem>

                                    <GridItem colSpan={1}>
                                        <Box fontSize={25} fontWeight={'light'} pt={16}>


                                            <Center p={2}>
                                                <Box borderWidth={5} height={213} width={213} borderColor='#0A81FF' borderRadius={25} >
                                                    <Center h={'100%'}>


                                                        <img src={`data:image/png;base64,${photo}`} alt={full_name} />




                                                    </Center>

                                                </Box>
                                            </Center>
                                        </Box>
                                    </GridItem>
                                </Grid>


                            </Center>
                            <Center>

                                <Box pt={8}>
                                    <NavLink to={'/'} >

                                        <Button
                                            type="submit"
                                            width={'100%'}
                                            backgroundColor={'red'}
                                            _hover={{
                                                // bg: 'red',
                                                // opacity: 0.8,
                                                color: 'white',
                                            }}
                                            color={'white'}
                                        >
                                            Continue with the application
                                        </Button>
                                    </NavLink>
                                </Box>
                            </Center>


                        </CardBody>

                    </Card>
                </Container>




            </div >
        </>
    )
}
