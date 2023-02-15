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
} from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

// import axios from "axios";
import { useState,useEffect } from "react";
import { useRef } from "react";

export default function AddNID() {

  const navigate = useNavigate("")

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/")
    }
  },[])
  
  const defaultSrc =
    "https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const imageUploadField = useRef();
    const [selectedImage, setSelectedImage] = useState();
    const [imageData, setImageData] = useState();
    const [formData, setFormData] = useState("");

    function onSubmit(data) {
        const modifiedData = data;
        modifiedData.face_image = imageData;
        setFormData(JSON.stringify(modifiedData));
        console.log(modifiedData);
    }

    return (

        <Container maxW="container.lg" px={20} pt={20} pb={10} bg='gray.50' boxShadow='dark-lg' >

            <h2>
                <b>Applicant Main Data</b>
            </h2>
            <br />
            {/* <br /> */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl isRequired>
                    <FormLabel>Face Image</FormLabel>
                    <div>
                        {selectedImage && (
                            <div>
                                <img
                                    alt="not found"
                                    width={"250px"}
                                    src={URL.createObjectURL(selectedImage)}
                                />
                                <br />
                                <button
                                    onClick={() => {
                                        setSelectedImage();
                                        setImageData();
                                        imageUploadField.current.value = "";
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        )}

                        <Input
                            type="file"
                            ref={imageUploadField}
                            border={false}
                            onChange={(event) => {
                                const selectedImage = event.target.files[0];

                                // if (selectedImage !== selectedImage.endsWith(".png") || selectedImage !== selectedImage.endsWith(".jpg") ) {
                                //   alert("File does not support. You must use .png or .jpg ");
                                //   event.target.value = "";
                                //   return;
                                // }
                                const fileExtension = selectedImage.name.split(".").at(-1);
                                const allowedFileTypes = ["jpg", "png"];
                                if (!allowedFileTypes.includes(fileExtension)) {
                                    alert(
                                        `Image does not support. Image must be in ${allowedFileTypes.join(
                                            " or "
                                        )}`
                                    );
                                    event.target.value = "";
                                    setSelectedImage();
                                    setImageData();
                                    return;
                                }
                                if (selectedImage.size > 5e5) {
                                    alert(
                                        "Image size is too big!. Please upload a image smaller than 500 Kb"
                                    );
                                    event.target.value = "";
                                    setSelectedImage();
                                    setImageData();
                                    return;
                                }
                                let reader = new FileReader();
                                reader.readAsDataURL(selectedImage);
                                reader.onload = function () {
                                    setImageData(reader.result);
                                    console.log(reader.result);
                                    setSelectedImage(selectedImage);
                                };
                                console.log(selectedImage);
                            }}
                        />
                    </div>
                </FormControl>
                <br />
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem colSpan={{
                        base: 2,
                        lg: 1,
                    }}>
                        <FormControl isRequired>
                            <FormLabel>National Identity Number</FormLabel>
                            <Input {...register("NIN")} placeholder="National Identity Number" />

                        </FormControl>
                    </GridItem>

                    <GridItem colSpan={{
                        base: 2,
                        lg: 1,
                    }}>
                        <FormControl isRequired>
                            <FormLabel >Mobile Number</FormLabel>
                            <InputGroup>
                                <InputLeftAddon children="+977" />
                                <Input {...register("mobile_number")} type="phone" placeholder="Mobile Number" />
                            </InputGroup>
                        </FormControl>
                    </GridItem>
                </Grid>

                <br />
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem colSpan={{
                        base: 3,
                        lg: 1,
                    }}>
                        <FormControl isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input {...register("first_name")} placeholder="First name" />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{
                        base: 3,
                        lg: 1,
                    }}>

                        <FormControl>
                            <FormLabel >Middle Name</FormLabel>
                            <Input {...register("middle_name")} placeholder="Middle Name" />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{
                        base: 3,
                        lg: 1,
                    }}>

                        <FormControl isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input {...register("last_name")} placeholder="Last Name" />
                        </FormControl>
                    </GridItem>
                </Grid>
                <br />
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem colSpan={{
                        base: 3,
                        lg: 1,
                    }}>

                        <FormControl isRequired>
                            <FormLabel >First Name (Devanagari)</FormLabel>
                            <Input {...register("first_name_devanagari")} placeholder="First Name (Devanagari)" />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{
                        base: 3,
                        lg: 1,
                    }}>

                        <FormControl>
                            <FormLabel>Middle Name (Devanagari)</FormLabel>
                            <Input {...register("middle_name_devanagari")} placeholder="Middle Name (Devanagari)" />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{
                        base: 3,
                        lg: 1,
                    }}>

                        <FormControl isRequired>
                            <FormLabel>Last Name (Devanagari)</FormLabel>
                            <Input {...register("last_name_devanagari")} placeholder="Last Name (Devenagari)" />
                        </FormControl>
                    </GridItem>

                </Grid>
                <br />


                <br />
                <h2>
                    <b>Additional Informations</b>
                </h2>
                <br />
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <GridItem colSpan={{
                        base: 2,
                        lg: 1,
                    }}>

                        <FormControl isRequired>
                            <FormLabel>Gender</FormLabel>
                            <Select {...register("gender")} placeholder='Gender'>
                                <option value='Male'>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </Select>
                            {/* <Input placeholder="Gender" /> */}
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={{
                        base: 2,
                        lg: 1,
                    }}>
                        <FormControl isRequired>
                            <FormLabel>Marital Status</FormLabel>
                            <Select {...register("marital_status")} placeholder='Marital status'>
                                <option value='Unmarried'>Male</option>
                                <option value='Married'>Female</option>
                                <option value='Divorced'>Other</option>
                            </Select>
                        </FormControl>
                    </GridItem>
                </Grid>
                <br />

                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>Academic Qualification</FormLabel>
                        <Input placeholder="Academic Qualification" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Occupation </FormLabel>
                        <Input placeholder="Occupation" />
                    </FormControl>


                </Grid>
                <br />

                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>Caste</FormLabel>
                        <Input placeholder="Caste" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Religion</FormLabel>
                        <Input placeholder="Religion" />
                    </FormControl>


                </Grid>
                <br />
                <h2>
                    <b>Birth Place</b>
                </h2>
                <br />

                <FormControl isRequired>
                    <FormLabel>Birth State</FormLabel>
                    <Input placeholder="Birth State" />
                </FormControl>
                <br />

                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>Birth District</FormLabel>
                        <Input placeholder="Birth District" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Birth Municipality</FormLabel>
                        <Input placeholder="Birth Municipality" />
                    </FormControl>
                </Grid>
                <br />

                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>Birth Ward</FormLabel>
                        <NumberInput max={50} min={1}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Birth Tole</FormLabel>
                        <Input placeholder="Birth Tole" />
                    </FormControl>
                </Grid>
                <br />

                <h2>
                    <b>Applicant's Permanent Address</b>
                </h2>
                <br />

                <FormControl isRequired>
                    <FormLabel>Permanent State</FormLabel>
                    <Input placeholder="Permanent State" />
                </FormControl>
                <br />

                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>Permanent District</FormLabel>
                        <Input placeholder="Permanent District" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Local Level</FormLabel>
                        <Input placeholder="Permanent Municipality" />
                    </FormControl>
                </Grid>
                <br />

                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>Ward Number</FormLabel>
                        <NumberInput max={50} min={1}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Village/Tole</FormLabel>
                        <Input placeholder="Birth Tole" />
                    </FormControl>
                </Grid>
                <br />

                <h2>
                    <b>Applicant's Temporary Address</b>
                </h2>
                <br />

                <FormControl isRequired>
                    <FormLabel>Temporary State</FormLabel>
                    <Input placeholder="Temporary State" />
                </FormControl>
                <br />

                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>Temporary District</FormLabel>
                        <Input placeholder="Temporary District" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Local Level</FormLabel>
                        <Input placeholder="Temporary Municipality" />
                    </FormControl>
                </Grid>
                <br />

                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>Ward Number</FormLabel>
                        <NumberInput max={50} min={1}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Village/Tole</FormLabel>
                        <Input placeholder="Birth Tole" />
                    </FormControl>
                </Grid>
                <br />

                <h2>
                    <b>Father's Details </b>
                </h2>
                <br />

                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input placeholder="First name" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Middle Name</FormLabel>
                        <Input placeholder="Middle Name" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder="Last Name" />
                    </FormControl>
                </Grid>
                <br />
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>National Identity Number</FormLabel>
                        <Input id="NIN" {...register("NIN")} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Nationality</FormLabel>
                        <Input placeholder="Nationality" />
                    </FormControl>
                </Grid>
                <br />

                <h2>
                    <b>Mother's Details </b>
                </h2>
                <br />

                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input placeholder="First name" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Middle Name</FormLabel>
                        <Input placeholder="Middle Name" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder="Last Name" />
                    </FormControl>
                </Grid>
                <br />
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>National Identity Number</FormLabel>
                        <Input id="NIN" {...register("NIN")} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Nationality</FormLabel>
                        <Input placeholder="Nationality" />
                    </FormControl>
                </Grid>
                <br />

                <h2>
                    <b>Grandfather's Details </b>
                </h2>
                <br />

                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input placeholder="First name" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Middle Name</FormLabel>
                        <Input placeholder="Middle Name" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder="Last Name" />
                    </FormControl>
                </Grid>
                <br />
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>National Identity Number</FormLabel>
                        <Input id="NIN" {...register("NIN")} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Nationality</FormLabel>
                        <Input placeholder="Nationality" />
                    </FormControl>
                </Grid>
                <br />

                <h2>
                    <b>Grandmother's Details </b>
                </h2>
                <br />

                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input placeholder="First name" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Middle Name</FormLabel>
                        <Input placeholder="Middle Name" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder="Last Name" />
                    </FormControl>
                </Grid>
                <br />
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>National Identity Number</FormLabel>
                        <Input id="NIN" {...register("NIN")} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Nationality</FormLabel>
                        <Input placeholder="Nationality" />
                    </FormControl>
                </Grid>
                <br />

                <h2>
                    <b>Spouse's Details </b>
                </h2>
                <br />

                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>First name</FormLabel>
                        <Input placeholder="First name" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Middle Name</FormLabel>
                        <Input placeholder="Middle Name" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Last Name</FormLabel>
                        <Input placeholder="Last Name" />
                    </FormControl>
                </Grid>
                <br />
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <FormControl isRequired>
                        <FormLabel>National Identity Number</FormLabel>
                        <Input id="NIN" {...register("NIN")} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Nationality</FormLabel>
                        <Input placeholder="Nationality" />
                    </FormControl>
                </Grid>
                <br />
                <Button type="submit" colorScheme="blue">
                    Submit
                </Button>

                {formData}
            </form>
        </Container>
    );
}
