import { useState, useContext, useRef } from "react";

import axios from "axios";
import {
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
  Card,
  CardBody,
  Heading,
  Text,
  Stack,
  StackDivider,
  Button,
  Grid,
  GridItem,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import AuthContext from "../store/auth-context";

export default function EditNID({ NIN, initialData }) {
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
    defaultValues: initialData
  });

  const imageUploadField = useRef();
  const [imageData, setImageData] = useState(initialData.face_image);

  const onUpdate = async (data) => {
    setIsLoading(true);
    const modifiedData = data;
    modifiedData.face_image = imageData;

    try {
      const response = await axios.put(
        `http://65.109.161.97:3000/nid/${NIN}`,
        {
          NIN: NIN,
          documentDetails: modifiedData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.token}`,
          },
        }
      );
      // reset();
      // setImageData();
      imageUploadField.current.value = "";
      setIsLoading(false);
      toast({
        title: "Update Successful.",
        description: `National Identity Card Updated.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Update Failed.",
        description: `Failed to update the National Identity Card.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  return (
    <Box pt={10}>
      <Card mx={{ base: 10, lg: 32 }}>
        <Box p={{ base: 2, lg: 10 }}>

          <CardBody>

            <form onSubmit={handleSubmit(onUpdate)} >
              <Stack divider={<StackDivider />} spacing="10" mb={20}>
                <Stack spacing={5}>
                  <Heading size={"md"} pb={8}>
                    <b>Applicant Main Data</b>
                  </Heading>

                  <FormControl>
                    <FormLabel>Face Image</FormLabel>
                    <div>
                      {imageData && (
                        <div>
                          <img
                            alt="not found"
                            width={"250px"}
                            src={`data:image/png;base64,${imageData}`}
                          />
                          <br />

                        </div>
                      )}

                      <Input
                        type="file"
                        ref={imageUploadField}
                        border={false}
                        onChange={(event) => {
                          const selectedImage = event.target.files[0];

                          // if (selectedImage !== selectedImage.endsWith(".png") || selectedImage !== selectedImage.endsWith(".jpg") ) {
                          //   alert("File does not support. You must use .png or .jpg ");
                          //   event.target.value = "";
                          //   return;
                          // }
                          const fileExtension = selectedImage.name
                            .split(".")
                            .at(-1);
                          const allowedFileTypes = ["jpg", "png"];
                          if (!allowedFileTypes.includes(fileExtension)) {
                            alert(
                              `Image does not support.Image must be in ${allowedFileTypes.join(
                                " or "
                              )}`
                            );
                            event.target.value = "";
                            return;
                          }
                          if (selectedImage.size > 5e5) {
                            alert(
                              "Image size is too big!. Please upload a image smaller than 500 Kb"
                            );
                            event.target.value = "";
                            return;
                          }
                          let reader = new FileReader();
                          reader.readAsDataURL(selectedImage);
                          reader.onload = function () {
                            setImageData(reader.result.split(",")[1]);
                            console.log(reader.result.split(",")[1]);
                          };
                        }}
                      />
                    </div>
                  </FormControl>




                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>National Identity Number</FormLabel>
                        <Text>{initialData.NIN}</Text>
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Mobile Number</FormLabel>
                        <InputGroup>
                          {/* <InputLeftAddon children="+977" /> */}
                          <Input
                            {...register("mobile_number")}
                            type="phone"
                            placeholder="Mobile Number"
                          />
                        </InputGroup>
                      </FormControl>
                    </GridItem>
                  </Grid>

                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input
                          {...register("first_name")}
                          placeholder="First name"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl>
                        <FormLabel>Middle Name</FormLabel>
                        <Input
                          {...register("middle_name")}
                          placeholder="Middle Name"
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
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          {...register("last_name")}
                          placeholder="Last Name"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>First Name (Devanagari)</FormLabel>
                        <Input
                          {...register("first_name_devanagari")}
                          placeholder="First Name (Devanagari)"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl>
                        <FormLabel>Middle Name (Devanagari)</FormLabel>
                        <Input
                          {...register("middle_name_devanagari")}
                          placeholder="Middle Name (Devanagari)"
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
                        <FormLabel>Last Name (Devanagari)</FormLabel>
                        <Input
                          {...register("last_name_devanagari")}
                          placeholder="Last Name (Devenagari)"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>

                <Stack spacing={5}>
                  <Heading size={"md"} pb={8}>
                    <b>Additional Information</b>
                  </Heading>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Date of Birth</FormLabel>
                        <Input
                          {...register("date_of_birth")}
                          placeholder="Date of Birth"
                          size="md"
                          type="date"
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
                        <FormLabel>Nationality</FormLabel>
                        <Input
                          {...register("nationality")}
                          placeholder="Nationality"
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
                        <FormLabel>Gender</FormLabel>
                        <Select {...register("gender")} placeholder="Gender">
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </Select>
                        {/* <Input placeholder="Gender" /> */}
                      </FormControl>
                    </GridItem>
                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Marital Status</FormLabel>
                        <Select
                          {...register("marital_status")}
                          placeholder="Marital status"
                        >
                          <option value="Unmarried">Unmarried</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                        </Select>
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
                        <FormLabel>Academic Qualification</FormLabel>
                        <Input
                          {...register("academic_qualification")}
                          placeholder="Academic Qualification"
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
                        <FormLabel>Occupation </FormLabel>
                        <Input
                          {...register("occupation")}
                          placeholder="Occupation"
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
                        <FormLabel>Caste</FormLabel>
                        <Input {...register("caste")} placeholder="Caste" />
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Religion</FormLabel>
                        <Input
                          {...register("religion")}
                          placeholder="Religion"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>
                <Stack spacing={5}>
                  <Heading size={"md"} pb={8}>
                    <b>Birth Place</b>
                  </Heading>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Birth State</FormLabel>
                        <Input
                          {...register("birth_state")}
                          placeholder="Birth State"
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
                        <FormLabel>Birth State (Devanagari)</FormLabel>
                        <Input
                          {...register("birth_state_devanagari")}
                          placeholder="Birth State (Devanagari)"
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
                        <FormLabel>Birth District</FormLabel>
                        <Input
                          {...register("birth_district")}
                          placeholder="Birth District"
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
                        <FormLabel>Birth District (Devanagari)</FormLabel>
                        <Input
                          {...register("birth_district_devanagari")}
                          placeholder="Birth Municipality (Devanagari)"
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
                        <FormLabel>Local Level</FormLabel>
                        <Input
                          {...register("birth_municipality")}
                          placeholder="Birth Municipality"
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
                        <FormLabel>Local Level (Devanagari)</FormLabel>
                        <Input
                          {...register("birth_municipality_devanagari")}
                          placeholder="Birth Municipality (Devanagari)"
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
                        <FormLabel>Birth Ward</FormLabel>
                        <NumberInput
                          {...register("birth_ward_number")}
                          max={50}
                          min={1}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Birth Tole</FormLabel>
                        <Input
                          {...register("birth_tole")}
                          placeholder="Birth Tole"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>

                <Stack spacing={5}>
                  <Heading size={"md"} pb={8}>
                    <b>Applicant's Permanent Address</b>
                  </Heading>

                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Permanent State</FormLabel>
                        <Input
                          {...register("permanent_state")}
                          placeholder="Permanent State"
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
                        <FormLabel>Permanent State (Devanagari)</FormLabel>
                        <Input
                          {...register("permanent_state_devanagari")}
                          placeholder="Permanent State (Devanagari)"
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
                        <FormLabel>Permanent District</FormLabel>
                        <Input
                          {...register("permanent_district")}
                          placeholder="Permanent District"
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
                        <FormLabel>Permanent District (Devanagari)</FormLabel>
                        <Input
                          {...register("permanent_district_devanagari")}
                          placeholder="Permanent District (Devanagari)"
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
                        <FormLabel>Local Level</FormLabel>
                        <Input
                          {...register("permanent_municipality")}
                          placeholder="Permanent Municipality"
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
                        <FormLabel>Local Level (Devanagari)</FormLabel>
                        <Input
                          {...register("permanent_municipality_devanagari")}
                          placeholder="Permanent Municipality (Devanagari)"
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
                        <FormLabel>Ward Number</FormLabel>
                        <NumberInput
                          {...register("permanent_ward_number")}
                          max={50}
                          min={1}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Village/Tole</FormLabel>
                        <Input
                          {...register("permanent_tole")}
                          placeholder="Birth Tole"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>

                  <FormControl isRequired>
                    <FormLabel>Permanent House Number</FormLabel>
                    <Input
                      {...register("permanent_house_number")}
                      placeholder="Permanent House Number"
                    />
                  </FormControl>
                </Stack>

                <Stack spacing={5}>
                  <Heading size={"md"} pb={8}>
                    <b>Applicant's Temporary Address</b>
                  </Heading>

                  <FormControl isRequired>
                    <FormLabel>Temporary State</FormLabel>

                    <Input
                      {...register("temporary_state")}
                      placeholder="Temporary State"
                    />
                  </FormControl>

                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Temporary District</FormLabel>
                        <Input
                          {...register("temporary_district")}
                          placeholder="Temporary District"
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
                        <FormLabel>Local Level</FormLabel>
                        <Input
                          {...register("temporary_municipality")}
                          placeholder="Temporary Municipality"
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
                        <FormLabel>Ward Number</FormLabel>
                        <NumberInput
                          {...register("temporary_ward_number")}
                          max={50}
                          min={1}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Village/Tole</FormLabel>
                        <Input
                          {...register("temporary_tole")}
                          placeholder="Birth Tole"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>

                <Stack spacing={5}>
                  <Heading size={"md"} pb={8}>
                    <b>Father's Details </b>
                  </Heading>

                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input
                          {...register("father_first_name")}
                          placeholder="First name"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl>
                        <FormLabel>Middle Name</FormLabel>
                        <Input
                          {...register("father_middle_name")}
                          placeholder="Middle Name"
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
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          {...register("father_last_name")}
                          placeholder="Last Name"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>First Name (Devanagari)</FormLabel>
                        <Input
                          {...register("father_first_name_devanagari")}
                          placeholder="First Name (Devanagari)"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl>
                        <FormLabel>Middle Name (Devanagari)</FormLabel>
                        <Input
                          {...register("father_middle_name_devanagari")}
                          placeholder="Middle Name (Devanagari)"
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
                        <FormLabel>Last Name (Devanagari)</FormLabel>
                        <Input
                          {...register("father_last_name_devanagari")}
                          placeholder="Last Name (Devenagari)"
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
                        <FormLabel>National Identity Number</FormLabel>
                        <Input id="NIN" {...register("father_NIN")} />
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Nationality</FormLabel>
                        <Input
                          {...register("father_nationality")}
                          placeholder="Nationality"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>

                <Stack spacing={5}>
                  <Heading size={"md"} pb={8}>
                    <b>Mother's Details </b>
                  </Heading>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input
                          {...register("mother_first_name")}
                          placeholder="First name"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl>
                        <FormLabel>Middle Name</FormLabel>
                        <Input
                          {...register("mother_middle_name")}
                          placeholder="Middle Name"
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
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          {...register("mother_last_name")}
                          placeholder="Last Name"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>First Name (Devanagari)</FormLabel>
                        <Input
                          {...register("mother_first_name_devanagari")}
                          placeholder="First Name (Devanagari)"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl>
                        <FormLabel>Middle Name (Devanagari)</FormLabel>
                        <Input
                          {...register("mother_middle_name_devanagari")}
                          placeholder="Middle Name (Devanagari)"
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
                        <FormLabel>Last Name (Devanagari)</FormLabel>
                        <Input
                          {...register("mother_last_name_devanagari")}
                          placeholder="Last Name (Devenagari)"
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
                        <FormLabel>National Identity Number</FormLabel>
                        <Input id="NIN" {...register("mother_NIN")} />
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Nationality</FormLabel>
                        <Input
                          {...register("mother_nationality")}
                          placeholder="Nationality"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>

                <Stack spacing={5}>
                  <Heading size={"md"} pb={8}>
                    <b>Grandfather's Details </b>
                  </Heading>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input
                          {...register("grandfather_first_name")}
                          placeholder="First name"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl>
                        <FormLabel>Middle Name</FormLabel>
                        <Input
                          {...register("grandfather_middle_name")}
                          placeholder="Middle Name"
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
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          {...register("grandfather_last_name")}
                          placeholder="Last Name"
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
                        <FormLabel>National Identity Number</FormLabel>
                        <Input id="NIN" {...register("grandfather_NIN")} />
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Nationality</FormLabel>
                        <Input
                          {...register("grandfather_nationality")}
                          placeholder="Nationality"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>

                <Stack spacing={5}>
                  <Heading size={"md"} pb={8}>
                    <b>Grandmother's Details </b>
                  </Heading>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input
                          {...register("grandmother_first_name")}
                          placeholder="First name"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl>
                        <FormLabel>Middle Name</FormLabel>
                        <Input
                          {...register("grandmother_middle_name")}
                          placeholder="Middle Name"
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
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          {...register("grandmother_last_name")}
                          placeholder="Last Name"
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
                        <FormLabel>National Identity Number</FormLabel>
                        <Input id="NIN" {...register("grandmother_NIN")} />
                      </FormControl>
                    </GridItem>
                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Nationality</FormLabel>
                        <Input
                          {...register("grandmother_nationality")}
                          placeholder="Nationality"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>

                <Stack spacing={5}>
                  <Heading size={"md"} pb={8}>
                    <b>Spouse's Details </b>
                  </Heading>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl >
                        <FormLabel>First name</FormLabel>
                        <Input
                          {...register("spouse_first_name")}
                          placeholder="First name"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl>
                        <FormLabel>Middle Name</FormLabel>
                        <Input
                          {...register("spouse_middle_name")}
                          placeholder="Middle Name"
                        />
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl >
                        <FormLabel>Last Name</FormLabel>
                        <Input
                          {...register("spouse_last_name")}
                          placeholder="Last Name"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl >
                        <FormLabel>First Name (Devanagari)</FormLabel>
                        <Input
                          {...register("spouse_first_name_devanagari")}
                          placeholder="First Name (Devanagari)"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl>
                        <FormLabel>Middle Name (Devanagari)</FormLabel>
                        <Input
                          {...register("spouse_middle_name_devanagari")}
                          placeholder="Middle Name (Devanagari)"
                        />
                      </FormControl>
                    </GridItem>
                    <GridItem
                      colSpan={{
                        base: 3,
                        lg: 1,
                      }}
                    >
                      <FormControl >
                        <FormLabel>Last Name (Devanagari)</FormLabel>
                        <Input
                          {...register("spouse_last_name_devanagari")}
                          placeholder="Last Name (Devenagari)"
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
                      <FormControl >
                        <FormLabel>National Identity Number</FormLabel>
                        <Input {...register("spouse_NIN")}
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
                      <FormControl>
                        <FormLabel>Nationality</FormLabel>
                        <Input
                          {...register("spouse_nationality")}
                          placeholder="Nationality"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                </Stack>
              </Stack>
              <Button

                type="submit"
                isLoading={isLoading}
                width={"100%"}
                backgroundColor={"#0a81ff"}
                color={"white"}
                loadingText="Updating..."
                colorScheme="messenger"
              >
                Update
              </Button>

            </form>
          </CardBody>
        </Box>
      </Card>
    </Box>
  );
}
