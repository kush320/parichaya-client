import { Box, Button, Center, Container, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom"
// import w3cwebsocket from 'websocket';
import NICLogo from '../assets/images/NIC_logo.png';
import { ReactComponent as FingerPrintSVG } from '../assets/svg/fingerprint.svg';

export default function ApplyScreen() {

  return (
    <>
      <div >
        <center>
          <Container pt={50}>

            <Box>
              <img src={NICLogo} alt="" height={'auto'} width='200' />
            </Box>
            <Box>
              <Text fontSize="2xl" fontWeight="bold" color="red">Online Account Opening</Text>
            </Box>
            {/* <div className="text" style={{ color: "red" }}>
              <p>Sarbashrestha Sunya Maujdat Bachat Khata </p>
            </div> */}
            <Box maxW={300} mt={10}>

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
                Apply
              </Button>
              <Link to="scan">
                <Button
                  type="submit"
                  width={'100%'}
                  backgroundColor={'#0A81FF'}
                  _hover={{
                    // bg: 'red',
                    // opacity: 0.8,
                    color: 'white',
                  }}
                  color={'white'}
                  mt={2}
                >
                  <Box mx={2}>
                    <FingerPrintSVG />
                  </Box>
                  Apply with Parichaya
                </Button>
              </Link>
            </Box>
          </Container>
        </center>

      </div>
    </>
  );
}
