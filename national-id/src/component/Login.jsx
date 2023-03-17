import { useState } from "react";

import axios from "axios";
import { Button, FormControl, FormLabel, Input, Container, Card, CardBody, Heading, Text, Center, Box } from "@chakra-ui/react";

import emblem from '../assets/emblem.png';
import "./Login.css";

export default function Login({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
    setError()

    try {
      const response = await axios.post(
        "http://65.109.161.97:3000/users/login/",
        {
          username,
          password,
        }
      );

      // setToken(response.data.token)
      onLogin(response.data.token)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setError("Invalid Username or Password");
      setIsLoading(false)
    }
  };

  return (
    <>
      <Container p={10} pt={20}>

        <Center display='flex' flexWrap={'wrap'}>

          <Center width={'100%'}>
            <img src={emblem} alt="" height={'auto'} width='100' />
          </Center>
          {/* <div className="kush">PARICHAYA</div> */}
          <Text fontSize={20} mt={5}>Sign in to Parichaya Karmachari Client</Text>
        </Center>
        <Card mx={10} mt={5}>
          <CardBody>

            <form className="p-3 mt-3" onSubmit={handleSubmit}>



              <FormControl pb={5}>
                <FormLabel>Username</FormLabel>
                <Input type='text' id="username" required value={username} onChange={(event) => setUsername(event.target.value)} />
              </FormControl>
              <FormControl pb={5}>
                <FormLabel>Password</FormLabel>
                <Input type='password' id="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
              </FormControl>

              <Center p={5}>
                {error && <div style={{ color: "red" }}>{error}</div>}
              </Center>
              <Button
                type="submit"
                isLoading={isLoading}
                width={'100%'}
                backgroundColor={'#0a81ff'}
                color={'white'}
                loadingText="Loggin you in..."
                colorScheme='messenger'
              >
                Login
              </Button>
            </form>
            <Text p={2}>Forgot password?</Text>
          </CardBody>
        </Card>

      </Container>
    </>
  );
}


