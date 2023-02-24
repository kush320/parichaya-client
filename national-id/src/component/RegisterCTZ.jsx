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

export default function RegisterCTZ() {
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
                    CTZ_CCN: modifiedData.CTZ_CCN,
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
                description: `Citizenship Card with NIN: ${modifiedData.CTZ_CCN} created.`,
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
                description: `Failed to register the Citizenship Card.`,
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
                    Citizenship Registration
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

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack divider={<StackDivider />} spacing='10' mb={20}>
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
                                                <FormLabel>Citizenship Certificate Number</FormLabel>
                                                <Input
                                                    {...register("CTZ_CCN")}
                                                    placeholder="Citizenship Certificate Number"
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
                                                <FormLabel>Citizenship Type</FormLabel>
                                                <Input
                                                    {...register("CTZ_citizenship_type ")}
                                                    placeholder="Citizenship Type"
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
                                                <FormLabel>Citizenship Type (Devanagari)</FormLabel>
                                                <Input
                                                    {...register("CTZ_citizenship_type_devanagari")}
                                                    placeholder="Citizenship Type (Devanagari)"
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
                                                <FormLabel>Issued District</FormLabel>
                                                <Input
                                                    {...register("CTZ_issued_district  ")}
                                                    placeholder="Issued District"
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
                                                <FormLabel>Issued District (Devanagari)</FormLabel>
                                                <Input
                                                    {...register("CTZ_issued_district_devanagari")}
                                                    placeholder="Issued District (Devanagari)"
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
                                                <FormLabel>Issuer Name</FormLabel>
                                                <Input
                                                    {...register("CTZ_issuer_name ")}
                                                    placeholder="Issued District"
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
                                                <FormLabel>Issuer Name (Devanagari)</FormLabel>
                                                <Input
                                                    {...register("CTZ_issuer_name_devanagari ")}
                                                    placeholder="Issuer Name (Devanagari)"
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
                                                <FormLabel>Date of Issue</FormLabel>
                                                <Input


                                                    size="md"
                                                    type="date"
                                                    {...register("CTZ_date_of_issue ")}
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
                                            <FormControl>
                                                <FormLabel>Issuer Designation (Devanagari)</FormLabel>
                                                <Input
                                                    {...register("CTZ_issuer_designation_devanagari ")}
                                                    placeholder="Issuer Designation (Devanagari)"
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
                                                <FormLabel> Father Citizenship Certificate Number</FormLabel>
                                                <Input
                                                    {...register("CTZ_father_CCN ")}
                                                    placeholder="Father Citizenship Certificate Number"
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
                                                <FormLabel>Father Address (Devanagari)</FormLabel>
                                                <Input
                                                    {...register("CTZ_father_address_devanagari ")}
                                                    placeholder="Father Address (Devanagari)"
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
                                                <FormLabel>Father Citizenship Type (Devanagari)</FormLabel>
                                                <Input
                                                    {...register("CTZ_father_citizenship_type_devanagari")}
                                                    placeholder="Father Citizenship Type (Devanagari)"
                                                />
                                            </FormControl>
                                        </GridItem>
                                    </Grid>
                                    {/* <Grid templateColumns="repeat(3, 1fr)" gap={6}>
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
                                    </Grid> */}

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
                                                <FormLabel> Mother Citizenship Certificate Number</FormLabel>
                                                <Input
                                                    {...register("CTZ_mother_CCN ")}
                                                    placeholder="Mother Citizenship Certificate Number"
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
                                                <FormLabel>Mother Address (Devanagari)</FormLabel>
                                                <Input
                                                    {...register("CTZ_mother_address_devanagari ")}
                                                    placeholder="Mother Address (Devanagari)"
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
                                                <FormLabel>Mother Citizenship Type (Devanagari)</FormLabel>
                                                <Input
                                                    {...register("CTZ_mother_citizenship_type_devanagari")}
                                                    placeholder="Mother Citizenship Type (Devanagari)"
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
                                                <FormLabel> Spouse Citizenship Certificate Number</FormLabel>
                                                <Input
                                                    {...register("CTZ_spouse_CCN ")}
                                                    placeholder="Spouse Citizenship Certificate Number"
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
                                                <FormLabel>Spouse Address (Devanagari)</FormLabel>
                                                <Input
                                                    {...register("CTZ_spouse_address_devanagari ")}
                                                    placeholder="Spouse Address (Devanagari)"
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
                                                <FormLabel>Spouse Citizenship Type (Devanagari)</FormLabel>
                                                <Input
                                                    {...register("CTZ_spouse_citizenship_type_devanagari")}
                                                    placeholder="Spouse Citizenship Type (Devanagari)"
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
