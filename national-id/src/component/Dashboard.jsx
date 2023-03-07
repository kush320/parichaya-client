import React, { useContext, useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Container,
  FormErrorMessage,
  FormHelperText,
  Box,
  Text,
  Card,
  CardBody,
  Select,
  Grid,
  GridItem,
  Button,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons'

import AuthContext from "../store/auth-context";
import EditNID from "./EditNID";
import EditDVL from "./EditDVL";
import EditCTZ from "./EditCTZ";

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const toast = useToast();
  const [selectedDocument, setSelectedDocument] = useState("nid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  async function fetchDocument(docType, nin) {

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

  async function handleSearch(event) {
    event.preventDefault();

    if (!searchQuery) {
      return;
    }
    setIsLoading(true)
    setSearchResult(null);
    try {
      const response = await axios.get(`http://65.109.161.97:3000/${selectedDocument}/check/${searchQuery}`);
      console.log(response.data)

      fetchDocument(selectedDocument, searchQuery);

    }
    catch (error) {
      toast({
        title: "Invalid National Identity Number.",
        description: `Document with given National Identity Number doesn't exist.`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setSearchQuery("");
      setIsLoading(false)
    }



    // const response = await axios.get(`http://65.109.161.97:3000/nid/${nin}`);
    // const newSearchQuery = event.target.value;
    // setSearchQuery(newSearchQuery);
    // fetchData(newSearchQuery);
  }

  return (
    <Box minH="80vh">
      <Card mx={{ base: 10, lg: 32 }}>
        <CardBody>
          <Box p={10}>
            <Text fontSize={16} fontWeight="medium">
              Search Documents
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
                  xl: 2,
                }}
              >
                <Select value={selectedDocument} onChange={e => { setSelectedDocument(e.target.value) }}>
                  <option value='nid'>National Identity Card</option>
                  <option value='ctz'>Citizenship</option>
                  <option value='dvl'>Driving License</option>
                </Select>
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
      {searchResult && searchResult.docType === "NID" &&
        <EditNID NIN={searchQuery} initialData={searchResult} />
      }
      {searchResult && searchResult.docType === "CTZ" &&
        <EditCTZ NIN={searchQuery} initialData={searchResult} />
      }
      {searchResult && searchResult.docType === "DVL" &&
        <EditDVL NIN={searchQuery} initialData={searchResult} />
      }
    </Box>
  );
}
