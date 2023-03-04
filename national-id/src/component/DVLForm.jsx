import {
  FormLabel,
  FormControl,
  Input,
  Select,
  Box,
  Card,
  CardBody,
  Text,
  Stack,
  StackDivider,
  Divider,
  Center,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";


export default function DVLForm({
  register,
  face_image,
  full_name,
  NIN,
  onSubmit,
  buttonText,
  buttonLoadingText,
  isLoading
}) {

  return (


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
                        placeholder="Select Blood Group"
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
                    <FormControl>
                      <FormLabel>Categories</FormLabel>

                      <Stack spacing={[1]} direction={["row", "column"]}>
                        <Box>
                          <Stack spacing={[12]} direction={["row"]}>
                            <Checkbox {...register("DVL_categories")} value="A" >A</Checkbox>
                            <Checkbox {...register("DVL_categories")} value="B">B</Checkbox>
                            <Checkbox {...register("DVL_categories")} value="C">C</Checkbox>
                            <Checkbox {...register("DVL_categories")} value="E">E</Checkbox>
                          </Stack>
                        </Box>
                        <Box>
                          <Stack spacing={[12]} direction={["row"]}>
                            <Checkbox  {...register("DVL_categories")} value="F">F</Checkbox>
                            <Checkbox  {...register("DVL_categories")} value="H">H</Checkbox>
                            <Checkbox  {...register("DVL_categories")} value="K">K</Checkbox>
                            <Checkbox  {...register("DVL_categories")} value="P">P</Checkbox>
                          </Stack>
                        </Box>
                      </Stack>
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
              loadingText={buttonLoadingText}
              colorScheme="messenger"
            >
              {buttonText}
            </Button>

          </form>
        </CardBody>
      </Box>
    </Card>

  );
}
