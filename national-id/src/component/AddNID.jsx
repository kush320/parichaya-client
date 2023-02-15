import {
  Container,
  FormLabel,
  FormControl,
  Input,
  NumberInput,
  NumberInputStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
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
    
    <Container  maxW="60%" py ="1rem" bg='gray.50' boxShadow='dark-lg' >
      
      <h2>
        <b>Applicant Main Data</b>
      </h2>
      <br/>
      {/* <br /> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel>National Identity Number</FormLabel>
          {/* <label htmlFor="NIN">National Identity Number</label> */}
          <Input id="NIN" {...register("NIN")} />
        </FormControl>
        <br />
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
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

            {/* {imageData} */}

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
                  return;
                }
                if (selectedImage.size > 5e5) {
                  alert(
                    "Image size is too big!. Please upload a image smaller than 500 Kb"
                  );
                  event.target.value = "";
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
        <h2>
          <b>Additional Infromations</b>
        </h2>
        <br />
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <Input placeholder="Gender" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Marital Status</FormLabel>
            <Input placeholder="Marital status" />
          </FormControl>
        </Grid>
        <br />

        <FormControl isRequired>
          <FormLabel>Academic Qualifications</FormLabel>
          <Input placeholder="Academic Qualifications" />
        </FormControl>
        <br />

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <FormControl isRequired>
            <FormLabel>Occupations </FormLabel>
            <Input placeholder="Occupations" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Caste</FormLabel>
            <Input placeholder="Caste" />
          </FormControl>
        </Grid>
        <br />

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <FormControl isRequired>
            <FormLabel>Religion</FormLabel>
            <Input placeholder="Religion" />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Mobile Number</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+977" />
              <Input type="phone" placeholder="Mobile Number" />
            </InputGroup>
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
          {formData}
        </Button>
        <br />
        <br />
        <br />
      </form>
    </Container>
  );
}
