import { useState, useContext } from "react";
import axios from "axios";
import {
    FormLabel,
    FormControl,
    Input,
    Box,
    Card,
    CardBody,
    Heading,
    Stack,
    StackDivider,
    Grid,
    GridItem,
    Button,
    useToast,
    Text,
    Center,
    Divider,
} from "@chakra-ui/react";


import { useForm } from "react-hook-form";

import AuthContext from "../store/auth-context";

export default function RegisterCTZForm({ nidData }) {
    const authContext = useContext(AuthContext);
    const toast = useToast()




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
        }
    });




    async function onSubmit(data) {
        setIsLoading(true);
        const modifiedData = data;


        try {
            const response = await axios.post(
                "http://65.109.161.97:3000/ctz/",
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
            setIsLoading(false)
            toast({
                title: 'Registration Successful.',
                description: `Citizenship ${modifiedData.CTZ_CCN} Created and Linked with National Identity Number: ${modifiedData.NIN}.`,
                status: 'success',
                duration: 5000,
                isClosable: true
            });
            console.log(response.data)


        } catch (error) {
            console.log(error)
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
            <Card mx={{ base: 10, lg: 32 }}>
                <Box p={{ base: 2, lg: 10 }}>

                    {/* <CardHeader >
                        <Heading size='lg'>
                            National Identity Card Registration
                        </Heading>
                    </CardHeader>
                    <Divider /> */}

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


                        </form>
                    </CardBody>
                </Box>

            </Card >
        </Box >

    );
}
