import { useState, useEffect, useContext } from "react";
import {
  FormLabel,
  FormControl,
  Input,
  Select,
  Box,
  Card,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Button,
  useToast,
  Grid,
  GridItem,
  Checkbox,
  CheckboxGroup,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import AuthContext from "../store/auth-context";
import DVLForm from "./DVLForm";
import CTZForm from "./CTZForm";

export default function EditCTZ({ NIN, initialData }) {
  const authContext = useContext(AuthContext);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData
  });

  const onUpdate = async (data) => {
    setIsLoading(true);
    const modifiedData = data;

    try {
      const response = await axios.put(
        `http://65.109.161.97:3000/dvl/${NIN}`,
        {
          NIN: NIN,
          documentDetails: modifiedData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.token}`,
          },
        }
      );
      setIsLoading(false);
      toast({
        title: "Update Successful.",
        description: `Driving License Updated.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Update Failed.",
        description: `Failed to update the Driving License.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  return (
    <Box pt={10}>
      <CTZForm
        register={register}
        face_image={initialData.face_image}
        full_name={initialData.first_name + " " + initialData.last_name}
        NIN={initialData.NIN}
        onSubmit={handleSubmit(onUpdate)}
        buttonText='Update'
        isLoading={isLoading}
        buttonLoadingText='Updating...'
      />

    </Box >
  );
}
