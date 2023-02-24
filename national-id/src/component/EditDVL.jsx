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
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import AuthContext from "../store/auth-context";

export default function EditDVL({ nin, initialData }) {
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
        `http://65.109.161.97:3000/dvl/${nin}`,
        {
          NIN: nin,
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
    <Box>
      <Box px={{ base: 10, lg: 32 }} my={10}>
        <Heading size="lg">Driving License Registration</Heading>
      </Box>
      <Card mx={{ base: 10, lg: 32 }}>
        <Box p={{ base: 2, lg: 10 }}>
          <CardBody>
            <form onSubmit={handleSubmit(onUpdate)}>
              <Stack divider={<StackDivider />} spacing="10" mb={20}>
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
                        <FormLabel>Driving License Number</FormLabel>

                        <Input
                          {...register("DVL_DLN")}
                          placeholder="Driving License Number"
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
                        <FormLabel>Blood Group</FormLabel>
                        <Select
                          {...register("DVL_blood_group")}
                          placeholder="Blood Group"
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </Select>
                      </FormControl>
                    </GridItem>

                    <GridItem
                      colSpan={{
                        base: 2,
                        lg: 1,
                      }}
                    >
                      <FormControl isRequired>
                        <FormLabel>Categories</FormLabel>

                        <CheckboxGroup colorScheme="green">
                          <Stack spacing={[1, 5]} direction={["column"]}>
                            <Checkbox value="A">A</Checkbox>
                            <Checkbox value="B">B</Checkbox>
                            <Checkbox value="kakashi">Kakashi</Checkbox>
                            <Checkbox value="ok">ok</Checkbox>

                          </Stack>
                        </CheckboxGroup>
                        {/* </Select> */}
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
                          {...register("DVL_date_of_issue")}
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
                      <FormControl isRequired>
                        <FormLabel>Date of Expiry</FormLabel>
                        <Input
                          size="md"
                          type="date"
                          {...register("DVL_date_of_expiry")}
                          placeholder="Date of Expiry"
                        />
                      </FormControl>
                    </GridItem>
                  </Grid>
                  <FormControl isRequired>
                    <FormLabel>Issued By</FormLabel>

                    <Input
                      {...register("DVL_issuer")}
                      placeholder="Issued By"
                    />
                  </FormControl>
                </Stack>
              </Stack>
              <Button
                type="submit"
                isLoading={isLoading}
                width={"100%"}
                backgroundColor={"#0a81ff"}
                color={"white"}
                loadingText="Updating..."
                colorScheme="messenger"
              >
                Update
              </Button>

            </form>
          </CardBody>
        </Box>
      </Card>
    </Box>
  );
}
