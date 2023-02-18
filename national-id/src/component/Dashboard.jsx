import React from "react";
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
  return (
    <Box minH='80vh'>

      <Card>
        <CardBody>

          <Box p={10} >
            <Text fontSize={16} fontWeight='medium'>
              Search Documents
            </Text>

            <FormControl>
              <Input placeholder="123445678" />
            </FormControl>
          </Box>
        </CardBody>
      </Card>
    </Box>
  );
}
