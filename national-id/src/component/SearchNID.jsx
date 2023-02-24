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
    Select,
    Text,
} from "@chakra-ui/react";


import { useForm } from "react-hook-form";

import AuthContext from "../store/auth-context";
import { Search2Icon } from "@chakra-ui/icons";
import RegisterCTZForm from "./RegisterCTZForm";

export default function SearchNID({ setSearchResult }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const authContext = useContext(AuthContext);
    const toast = useToast()



    const fetchDocument = async (docType, nin) => {

        try {
            const response = await axios.get(`http://65.109.161.97:3000/${docType}/${nin}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authContext.token}`,
                    },
                });
            console.log(response.data)
            setSearchResult(response.data);
            setIsLoading(false)
            // setSearchResult(response.data);
        } catch (error) {
            console.error(error);
            toast({
                title: "Something went wrong.",
                description: `Failed to fetch the doucment details. Please try again later.`,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            setSearchQuery("");

            setIsLoading(false);
        }
    }


    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    async function handleSearch(event) {
        event.preventDefault();

        if (!searchQuery) {
            return;
        }
        setIsLoading(true)
        setSearchResult(null)
        try {
            const response = await axios.get(`http://65.109.161.97:3000/nid/check/${searchQuery}`);
            console.log(response.data)
            fetchDocument('nid', searchQuery);

        }
        catch (error) {
            toast({
                title: "Invalid National Identity Number.",
                description: `National Identity ${searchQuery} doesn't exist.`,
                status: "error",
                duration: 2000,
                isClosable: true,
            });
            setSearchQuery("");
            setIsLoading(false)
        }



    }



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

        <Card mx={{ base: 10, lg: 32 }}>
            <CardBody>
                <Box p={10}>
                    <Text fontSize={16} fontWeight="medium">
                        National Identity Number
                    </Text>
                    <Grid templateColumns="repeat(6, 1fr)" gap={6}>

                        <GridItem
                            colSpan={{
                                base: 6,
                                xl: 3,
                            }}
                        >


                            <FormControl>
                                <Input
                                    placeholder="Enter National Identity Number"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                />
                                <span> <Text color={'white'}>

                                    699-526-518-7
                                </Text>
                                </span>
                            </FormControl>
                        </GridItem>

                        <GridItem
                            colSpan={{
                                base: 6,
                                xl: 1,
                            }}
                        >


                            <Button
                                onClick={handleSearch}
                                isLoading={isLoading}
                                width={"100%"}
                                backgroundColor={"#0a81ff"}
                                color={"white"}
                                loadingText="Searching"
                                colorScheme="messenger"
                                leftIcon={<Search2Icon />}
                            >
                                Search
                            </Button>
                        </GridItem>

                    </Grid>

                </Box>




            </CardBody>
        </Card>

    );
}
