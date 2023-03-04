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
    Text,
    Center,
    Divider,
} from "@chakra-ui/react";




export default function CTZForm({ register,
    face_image,
    full_name,
    NIN,
    onSubmit,
    buttonText,
    buttonLoadingText,
    isLoading }) {



    return (
        <Box>
            <Card mx={{ base: 10, lg: 32 }}>
                <Box p={{ base: 2, lg: 10 }}>



                    <CardBody>
                        <Box>
                            <Center>

                                {face_image && (
                                    <div>
                                        <img
                                            alt="not found"
                                            width={"250px"}
                                            src={`data:image/png;base64,${face_image}`}
                                        />
                                        <br />

                                    </div>
                                )}
                            </Center>
                            <Center>
                                <Text fontSize={20} fontWeight={'medium'}>

                                    {full_name}
                                </Text>
                            </Center>
                            <Box py={10}>

                                <Divider />
                            </Box>
                        </Box>


                        <form onSubmit={onSubmit}>
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
                                                <Text>{NIN}</Text>
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
                                                    {...register("CTZ_citizenship_type")}
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
                                                    {...register("CTZ_issued_district")}
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
                                                    {...register("CTZ_issuer_name")}
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
                                                    {...register("CTZ_issuer_name_devanagari")}
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
                                                    {...register("CTZ_date_of_issue")}
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
                                                    {...register("CTZ_issuer_designation_devanagari")}
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
                                                    {...register("CTZ_father_CCN")}
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
                                                    {...register("CTZ_father_address_devanagari")}
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
                                                    {...register("CTZ_mother_CCN")}
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
                                                    {...register("CTZ_mother_address_devanagari")}
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
                                                    {...register("CTZ_spouse_CCN")}
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
                                                    {...register("CTZ_spouse_address_devanagari")}
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
                                loadingText={buttonLoadingText}
                                colorScheme='messenger'
                            >
                                {buttonText}
                            </Button>


                        </form>
                    </CardBody>
                </Box>

            </Card >
        </Box >

    );
}
