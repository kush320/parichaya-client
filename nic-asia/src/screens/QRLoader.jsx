import React from "react";
import QRCode from "react-qr-code";
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useState } from "react";
import { Box, Button, Card, CardBody, Center, Container, Divider, Grid, GridItem, Spinner, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { ReactComponent as PhotoSVG } from '../assets/svg/photo.svg';
import { ReactComponent as FullnameSVG } from '../assets/svg/fullname.svg';
import { ReactComponent as MobileSVG } from '../assets/svg/mobile.svg';
import { ReactComponent as CitizenshipSVG } from '../assets/svg/citizenship.svg';
import { RepeatIcon } from "@chakra-ui/icons";

const SOCKET_URL = 'ws://65.109.161.97:8000/ws/qr/request/';
// const SOCKET_URL = 'ws://localhost:8000/ws/5235/';

export default function QRLoader({ setRequestedData }) {
    const [qrData, setQRData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(SOCKET_URL, {
        // share: true,


        onMessage: (msg) => {
            const ws = getWebSocket()
            console.log(msg)
            const message = JSON.parse(msg.data)
            console.log(message)
            if (message.type === "request.registered") {
                setQRData(message.request_id)
            }
            if (message.type === 'request.approved') {
                setIsLoading(true);
                console.log(message.message)
            }
            if (message.type === 'request.data') {
                setIsLoading(false);
                setRequestedData(message.data)
                console.log(message.data)
                ws.close()
            }
            if (message.type === 'request.rejected') {
                setError("Request was rejected.")
                console.log(message.message)
                ws.close()
            }
        },
        onError: (err) => {
            console.log('Websocket Error!')
            console.log(err)

        },
        onClose: () => {
            console.log('Websocket Closed!')
        },
        onOpen: () => {
            console.log('Websocket Connected!')
        },
        //Will attempt to reconnect on all close events, such as server shutting down
        shouldReconnect: (closeEvent) => false,
        // retryOnError: false,
    });
    return (
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
                                            <Text >
                                                Photo
                                            </Text>
                                        </Wrap>
                                        <Divider />
                                        <Wrap p={2}>


                                            <FullnameSVG width={30} />

                                            <Text>

                                                Full Name
                                            </Text>
                                        </Wrap>
                                        <Divider />
                                        <Wrap p={2}>

                                            <MobileSVG width={30} />
                                            <Text>

                                                Mobile Number
                                            </Text>
                                        </Wrap>
                                        <Divider />
                                        <Wrap p={2}>

                                            <CitizenshipSVG width={30} />
                                            <Text>
                                                Citizenship Details
                                            </Text>
                                        </Wrap>
                                        <Divider />
                                    </Box>

                                </Box>
                            </GridItem>

                            <GridItem colSpan={1}>
                                <Box fontSize={25} fontWeight={'light'}>


                                    <Center lineHeight={1}>
                                        Scan with
                                    </Center>
                                    <Center >
                                        Parichaya App
                                    </Center>
                                    <Center p={2}>
                                        <Box borderWidth={5} height={213} width={213} borderColor='#0A81FF' borderRadius={25} >
                                            <Center h={'100%'}>
                                                {(readyState === ReadyState.CONNECTING || isLoading) &&
                                                    <Spinner
                                                        thickness='4px'
                                                        speed='0.65s'
                                                        emptyColor='gray.200'
                                                        color='#0A81FF'
                                                        size='xl'
                                                    />
                                                }
                                                {readyState === ReadyState.CLOSED &&
                                                    <Button bg={'#0A81FF'} borderRadius={50} height={50} width={50}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            window.location.reload()
                                                        }}>
                                                        <RepeatIcon color={'white'} fontSize={25} />
                                                    </Button>

                                                }

                                                {readyState === ReadyState.OPEN && !isLoading &&
                                                    qrData &&
                                                    <QRCode
                                                        level="Q"
                                                        style={{ width: 150, height: 150 }}
                                                        value={qrData}
                                                    />
                                                }





                                            </Center>

                                        </Box>
                                    </Center>
                                    {error &&
                                        <Text color={'red'} fontSize={20}>
                                            <Center>


                                                {error}
                                            </Center>
                                            <Center>

                                                Please try again.
                                            </Center>
                                        </Text>
                                    }
                                </Box>
                            </GridItem>
                        </Grid>
                    </Center>


                </CardBody>

            </Card>
        </Container>


    );
}
