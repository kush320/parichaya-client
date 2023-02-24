import {
  Container,
  FormLabel,
  FormControl,
  Input,
  Select,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  InputGroup,
  InputLeftAddon,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Stack,
  StackDivider,
  Divider,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// import axios from "axios";
import { useState, useContext } from "react";
import AuthContext from "../store/auth-context";

export default function RegisterDVLForm({ nidData }) {
  const authContext = useContext(AuthContext);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      NIN: nidData.NIN,
      DVL_categories: [],
    },
  });

  //   const imageUploadField = useRef();
  //   const [selectedImage, setSelectedImage] = useState();
  //   const [imageData, setImageData] = useState();
  async function onSubmit(data) {
    setIsLoading(true);
    const modifiedData = data;
    console.log(modifiedData);

    try {
      const response = await axios.post(
        "http://65.109.161.97:3000/dvl/",
        {
          NIN: modifiedData.NIN,
          documentDetails: modifiedData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.token}`,
          },
        }
      );
      reset();
      setIsLoading(false);
      toast({
        title: "Registration Successful.",
        description: `Driving License ${modifiedData.DVL_DLN} Created and Linked with National Identity Number: ${modifiedData.NIN}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Registration Failed.",
        description: `Failed to register the Driving License.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  return (


    <Card mx={{ base: 10, lg: 32 }}>
      <Box p={{ base: 2, lg: 10 }}>
        <CardBody>
          <Box>
            <Center>

              {nidData.face_image && (
                <div>
                  <img
                    alt="not found"
                    width={"250px"}
                    src={`data:image/png;base64,${nidData.face_image}`}
                  />
                  <br />

                </div>
              )}
            </Center>
            <Center>
              <Text fontSize={20} fontWeight={'medium'}>

                {nidData.first_name} {nidData.last_name}
              </Text>
            </Center>
            <Box py={10}>

              <Divider />
            </Box>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack divider={<StackDivider />} spacing="10" mb={20}>
              <Stack spacing={5}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem
                    colSpan={{
                      base: 2,
                      lg: 1,
                    }}
                  >
                    <FormControl isRequired>
                      <FormLabel>National Identity Number</FormLabel>
                      <Text>{nidData.NIN}</Text>
                    </FormControl>
                  </GridItem>

                  <GridItem
                    colSpan={{
                      base: 2,
                      lg: 1,
                    }}
                  >
                    <FormControl isRequired>
                      <FormLabel>Driving License Number</FormLabel>

                      <Input
                        {...register("DVL_DLN")}
                        placeholder="Driving License Number"
                      />
                    </FormControl>
                  </GridItem>
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem
                    colSpan={{
                      base: 2,
                      lg: 1,
                    }}
                  >

                    <FormControl isRequired>
                      <FormLabel>Blood Group</FormLabel>
                      <Select
                        {...register("DVL_blood_group")}
                        placeholder="Select Blood Group"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </Select>
                    </FormControl>
                  </GridItem>

                  <GridItem
                    colSpan={{
                      base: 2,
                      lg: 1,
                    }}
                  >
                    <FormControl>
                      <FormLabel>Categories</FormLabel>

                      {/* <Select
                          {...register("DVL_categories  ")}
                          placeholder="Categories"
                        > */}

                      <CheckboxGroup colorScheme={'blue'} >
                        <Stack spacing={[1]} direction={["row", "column"]}>
                          <Box>
                            <Stack spacing={[12]} direction={["row"]}>
                              <Checkbox {...register("DVL_categories")} value="A">A</Checkbox>
                              <Checkbox {...register("DVL_categories")} value="B">B</Checkbox>
                              <Checkbox {...register("DVL_categories")} value="C">C</Checkbox>
                              <Checkbox {...register("DVL_categories")} value="E">E</Checkbox>
                            </Stack>
                          </Box>
                          <Box>
                            <Stack spacing={[12]} direction={["row"]}>
                              <Checkbox  {...register("DVL_categories")} value="F">F</Checkbox>
                              <Checkbox  {...register("DVL_categories")} value="H">H</Checkbox>
                              <Checkbox  {...register("DVL_categories")} value="K">K</Checkbox>
                              <Checkbox  {...register("DVL_categories")} value="P">P</Checkbox>
                            </Stack>
                          </Box>
                        </Stack>
                      </CheckboxGroup>
                    </FormControl>
                  </GridItem>
                </Grid>

                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <GridItem
                    colSpan={{
                      base: 2,
                      lg: 1,
                    }}
                  >
                    <FormControl isRequired>
                      <FormLabel>Date of Issue</FormLabel>
                      <Input
                        size="md"
                        type="date"
                        {...register("DVL_date_of_issue")}
                        placeholder="Date of Issue"
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem
                    colSpan={{
                      base: 3,
                      lg: 1,
                    }}
                  >
                    <FormControl isRequired>
                      <FormLabel>Date of Expiry</FormLabel>
                      <Input
                        size="md"
                        type="date"
                        {...register("DVL_date_of_expiry")}
                        placeholder="Date of Expiry"
                      />
                    </FormControl>
                  </GridItem>
                </Grid>
                <FormControl isRequired>
                  <FormLabel>Issued By</FormLabel>

                  <Input
                    {...register("DVL_issuer")}
                    placeholder="Issued By"
                  />
                </FormControl>
              </Stack>
            </Stack>
            <Button
              type="submit"
              isLoading={isLoading}
              width={"100%"}
              backgroundColor={"#0a81ff"}
              color={"white"}
              loadingText="Submitting..."
              colorScheme="messenger"
            >
              Submit
            </Button>

          </form>
        </CardBody>
      </Box>
    </Card>

  );
}
