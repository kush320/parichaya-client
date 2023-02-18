import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Container,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

export default function Search() {
  return (
    <div >
        <container maxW='550px' >
      <FormControl>
        <Input placeholder="123445678" />
      </FormControl>
      </container>
    </div>
  );
}
