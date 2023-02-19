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
    Divider
} from "@chakra-ui/react";
import axios from "axios";

import { Grid, GridItem } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'

import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useRef } from "react";
import AuthContext from "../store/auth-context";

export default function RegisterDVL() {
    const authContext = useContext(AuthContext);
    const toast = useToast()


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

    const imageUploadField = useRef();
    const [selectedImage, setSelectedImage] = useState();
    const [imageData, setImageData] = useState();
    const [formData, setFormData] = useState("");

    async function onSubmit(data) {
        setIsLoading(true);
        const modifiedData = data;
        modifiedData.face_image = imageData;


        try {
            const response = await axios.post(
                "http://65.109.161.97:3000/nid/",
                {
                    NIN: modifiedData.NIN,
                    documentDetails: modifiedData
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authContext.token}`
                    }
                }
            );
            reset();
            setSelectedImage();
            setImageData();
            imageUploadField.current.value = "";
            setIsLoading(false)
            toast({
                title: 'Registration Successful.',
                description: `National Identity Card with NIN: ${modifiedData.NIN} created.`,
                status: 'success',
                duration: 5000,
                isClosable: true
            });
            console.log(response.data)


        } catch (error) {
            console.log(error)
            setSubmissionError("Failed to register.");
            toast({
                title: 'Registration Failed.',
                description: `Failed to register the National Identity Card.`,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            setIsLoading(false)
        }



        setIsLoading(false);
    }

    return (
        <Box>
            <Box px={{ base: 10, lg: 32 }} my={10}>

                <Heading size='lg'>
                    Driving License Registration
                </Heading>
            </Box>
            <Card mx={{ base: 10, lg: 32 }}>
                <Box p={{ base: 2, lg: 10 }}>

                    {/* <CardHeader >
                        <Heading size='lg'>
                            National Identity Card Registration
                        </Heading>
                    </CardHeader>
                    <Divider /> */}

                    <CardBody>


                        <br />
                        {/* <br /> */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack divider={<StackDivider />} spacing='10' mb={20}>
                                <Stack spacing={5}>

                                    <Heading size={'md'} pb={8}>
                                        <b>Applicant Main Data</b>
                                    </Heading>

                                    <FormControl isRequired>
                                        <FormLabel>Face Image</FormLabel>
                                        <div>
                                            {selectedImage && (
                                                <div>
                                                    <img
                                                        alt="not found"
                                                        width={"250px"}
                                                        src={URL.createObjectURL(selectedImage)}
                                                    />
                                                    <br />
                                                    <button
                                                        onClick={() => {
                                                            setSelectedImage();
                                                            setImageData();
                                                            imageUploadField.current.value = "";
                                                        }}
                                                    >
                                                        Remove
                                                    </button>
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
                                                    const fileExtension = selectedImage.name.split(".").at(-1);
                                                    const allowedFileTypes = ["jpg", "png"];
                                                    if (!allowedFileTypes.includes(fileExtension)) {
                                                        alert(
                                                            `Image does not support.Image must be in ${allowedFileTypes.join(
                                                                " or "
                                                            )
                                                            }`
                                                        );
                                                        event.target.value = "";
                                                        setSelectedImage();
                                                        setImageData();
                                                        return;
                                                    }
                                                    if (selectedImage.size > 5e5) {
                                                        alert(
                                                            "Image size is too big!. Please upload a image smaller than 500 Kb"
                                                        );
                                                        event.target.value = "";
                                                        setSelectedImage();
                                                        setImageData();
                                                        return;
                                                    }
                                                    let reader = new FileReader();
                                                    reader.readAsDataURL(selectedImage);
                                                    reader.onload = function () {
                                                        setImageData(reader.result.split(",")[1]);
                                                        console.log(reader.result.split(',')[1]);
                                                        setSelectedImage(selectedImage);
                                                    };
                                                    console.log(selectedImage);
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
                                                <FormLabel>Mobile Number</FormLabel>
                                                <InputGroup>
                                                    <InputLeftAddon children="+977" />
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
                                                <Input {...register("first_name")} placeholder="First name" />
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
                                                <Input {...register("middle_name")} placeholder="Middle Name" />
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
                                                <Input {...register("last_name")} placeholder="Last Name" />
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

                                    <Heading size={'md'} pb={8}>
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
                                                    {...register("academic_qualificatio")}
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
                                                <Input {...register("occupation")} placeholder="Occupation" />
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
                                                <Input {...register("religion")} placeholder="Religion" />
                                            </FormControl>
                                        </GridItem>
                                    </Grid>
                                </Stack>
                                <Stack spacing={5}>

                                    <Heading size={'md'} pb={8}>
                                        <b>Birth Place</b>
                                    </Heading>
                                    <FormControl isRequired>
                                        <FormLabel>Birth State</FormLabel>
                                        <Input {...register("birth_state")} placeholder="Birth State" />
                                    </FormControl>

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
                                                <FormLabel>Birth Municipality</FormLabel>
                                                <Input
                                                    {...register("birth_municipality")}
                                                    placeholder="Birth Municipality"
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
                                                <NumberInput {...register("birth_ward")} max={50} min={1}>
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
                                                <Input {...register("birth_tole")} placeholder="Birth Tole" />
                                            </FormControl>
                                        </GridItem>
                                    </Grid>
                                </Stack>

                                <Stack spacing={5}>
                                    <Heading size={'md'} pb={8}>
                                        <b>Applicant's Permanent Address</b>
                                    </Heading>


                                    <FormControl isRequired>
                                        <FormLabel>Permanent State</FormLabel>
                                        <Input
                                            {...register("permanent_state")}
                                            placeholder="Permanent State"
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
                                                <FormLabel>Local Level</FormLabel>
                                                <Input
                                                    {...register("permanent_municipality")}
                                                    placeholder="Permanent Municipality"
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
                                                    {...register("permanent_village/tole")}
                                                    placeholder="Birth Tole"
                                                />
                                            </FormControl>
                                        </GridItem>
                                    </Grid>
                                </Stack>

                                <Stack spacing={5}>

                                    <Heading size={'md'} pb={8}>
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
                                                    {...register("temporary_local_level")}
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
                                                    {...register("temporary_village/tole")}
                                                    placeholder="Birth Tole"
                                                />
                                            </FormControl>
                                        </GridItem>
                                    </Grid>
                                </Stack>

                                <Stack spacing={5}>
                                    <Heading size={'md'} pb={8}>
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
                                    <Heading size={'md'} pb={8}>
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
                                    <Heading size={'md'} pb={8}>
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
                                                    {...register("grandfather_first_name_devanagari")}
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
                                                    {...register("grandfather_middle_name_devanagari")}
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
                                                    {...register("grandfather_last_name_devanagari")}
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
                                    <Heading size={'md'} pb={8}>
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
                                                    {...register("grandmother_first_name_devanagari")}
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
                                                    {...register("grandmother_middle_name_devanagari")}
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
                                                    {...register("grandmother_last_name_devanagari")}
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
                                    <Heading size={'md'} pb={8}>
                                        <b>Spouse's Details </b>
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
                                            <FormControl isRequired>
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
                                            <FormControl isRequired>
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
                                            <FormControl isRequired>
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
                                            <FormControl isRequired>
                                                <FormLabel>National Identity Number</FormLabel>
                                                <Input id="NIN" {...register("spouse_NIN")} />
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
                                width={'100%'}
                                backgroundColor={'#0a81ff'}
                                color={'white'}
                                loadingText="Submitting..."
                                colorScheme='messenger'
                            >
                                Submit
                            </Button>


                            {formData}
                        </form>
                    </CardBody>
                </Box>

            </Card >
        </Box>

    );
}
