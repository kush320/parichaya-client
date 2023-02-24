import React, { useState } from "react";
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
} from "@chakra-ui/react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  async function fetchData(searchQuery) {
    try {
      const response = await axios.get(`http://65.109.161.97:3000/nid/123-456-789-0=${searchQuery}`);
      setSearchResult(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearchQueryChange(event) {
    const newSearchQuery = event.target.value;
    setSearchQuery(newSearchQuery);
    fetchData(newSearchQuery);
  }

  return (
    <Box minH="80vh">
      <Card>
        <CardBody>
          <Box p={10}>
            <Text fontSize={16} fontWeight="medium">
              Search Documents
            </Text>
            <FormControl>
              <Input
                placeholder="Search........."
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
              {searchResult.map((item) => (
                <div key={item.NIN}>{item.NIN}</div>
              ))}
            </FormControl>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
