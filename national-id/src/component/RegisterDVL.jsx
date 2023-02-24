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
import { useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import SearchNID from "./SearchNID";
import RegisterDVLForm from "./RegisterDVLForm";

export default function RegisterDVL() {
  const [nidData, setNidData] = useState(null)



  return (
    <Box>
      <Box px={{ base: 10, lg: 32 }} my={10}>

        <Heading size='lg'>
          Driving License Registration
        </Heading>
      </Box>
      {!nidData && <SearchNID setSearchResult={setNidData} />}
      {nidData && <RegisterDVLForm nidData={nidData} />}
    </Box>

  );
}
