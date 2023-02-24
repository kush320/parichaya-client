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
} from "@chakra-ui/react";
import axios from "axios";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useRef } from "react";
import AuthContext from "../store/auth-context";

export default function RegisterDVL() {
  const authContext = useContext(AuthContext);
  const toast = useToast();

  const navigate = useNavigate("");
  const [isLoading, setIsLoading] = useState(false);
  const [submissionError, setSubmissionError] = useState();
  //   useEffect(() => {
  //     if (!localStorage.getItem("token")) {
  //       navigate("/");
  //     }
  //   }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  //   const imageUploadField = useRef();
  //   const [selectedImage, setSelectedImage] = useState();
  //   const [imageData, setImageData] = useState();
  const [formData, setFormData] = useState("");

  async function onSubmit(data) {
    setIsLoading(true);
    const modifiedData = data;
    // modifiedData.face_image = imageData;

    try {
      const response = await axios.post(
        "http://65.109.161.97:3000/nid/",
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
      //   reset();
      //   setSelectedImage();
      //   setImageData();
      //   imageUploadField.current.value = "";
      //   setIsLoading(false);
      toast({
        title: "Registration Successful.",
        description: `National Identity Card with NIN: ${modifiedData.NIN} created.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setSubmissionError("Failed to register.");
      toast({
        title: "Registration Failed.",
        description: `Failed to register the National Identity Card.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  return (
    <Box>
      <Box px={{ base: 10, lg: 32 }} my={10}>
        <Heading size="lg">Driving License Registration</Heading>
      </Box>
      <Card mx={{ base: 10, lg: 32 }}>
        <Box p={{ base: 2, lg: 10 }}>
          <CardBody>
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
                        <Input
                          {...register("NIN")}
                          placeholder="National Identity Number"
                        />
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
                          {...register("DVL_DLN ")}
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
                          placeholder="Blood Group"
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
                      <FormControl isRequired>
                        <FormLabel>Categories</FormLabel>

                        {/* <Select
                          {...register("DVL_categories  ")}
                          placeholder="Categories"
                        > */}
                        <CheckboxGroup colorScheme="green">
                          <Stack spacing={[1, 5]} direction={["column"]}>
                            <Checkbox value="A">A</Checkbox>
                            <Checkbox value="B">B</Checkbox>
                            <Checkbox value="kakashi">Kakashi</Checkbox>
                            <Checkbox value="ok">ok</Checkbox>

                            {/* <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                          <option value="E">E</option>
                          <option value="F">F</option>
                          <option value="H">H</option>
                          <option value="K">K</option>
                          <option value="P">P</option> */}
                          </Stack>
                        </CheckboxGroup>
                        {/* </Select> */}
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
                          {...register("DVL_date_of_issue  ")}
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
                          {...register("DVL_date_of_expiry ")}
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

              {formData}
            </form>
          </CardBody>
        </Box>
      </Card>
    </Box>
  );
}
