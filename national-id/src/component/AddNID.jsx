import { Container } from '@chakra-ui/react'
import axios from 'axios'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
} from '@chakra-ui/react'
import { Formik, Field, Form, validateYupSchema } from "formik";
// import { useFileUpload } from "use-file-upload";
import { useState } from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'


export default function AddNID() {
    const defaultSrc =
        "https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";

    // const [files, selectFiles] = useFileUpload();
    const [selectedImage, setSelectedImage] = useState();
    const [imageData, setImageData] = useState();

    return (
        <Container>
            <Formik
                initialValues={{
                    NID_face_image: imageData,
                }}
                onSubmit={async (values, actions) => {
                    values.NID_face_image = imageData;
                    const payload = {
                        NIN: values.NID_NIN,
                        documentDetails: values
                    }
                    console.log(payload)
                    const instance = axios.create({
                        baseURL: 'http://localhost:3000',
                        // timeout: 1000,
                        headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFzaW1uZXBhbCIsImlkIjoiNjNjMmQ0YjhlODlhOTU3MGFkMDMxZWU4IiwiaWF0IjoxNjczODU1OTQ5fQ.bazuSDlsP0yhU5roao1ylRipL0ZCRlFGJeChW9CDCOk' }
                    });
                    try {

                        const response = await instance.post('http://localhost:3000/nid/', payload)
                        console.log(response);
                    }
                    catch (error) {
                        console.log(error);
                    }




                }}
            >
                {(props) => (

                    <Form>
                        {/* {JSON.stringify(props)} */}
                        <Field name='NID_NIN'>
                            {({ field, form }) => (


                                <FormControl isRequired>
                                    <FormLabel> National Identity Number</FormLabel>
                                    <Input {...field} placeholder='National Identity Number' />
                                </FormControl>
                            )}
                        </Field>
                        <Field name='NID_face_image_upload' >
                            {({ field, form }) => (
                                < FormControl isRequired >
                                    {/* {JSON.stringify(field)} */}
                                    {/* {JSON.stringify(form)} */}
                                    <FormLabel>Face Image</FormLabel>
                                    <div>
                                        {selectedImage && (
                                            <div>
                                                <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                                <br />
                                                <button onClick={() => setSelectedImage(null)}>Remove</button>
                                            </div>
                                        )}
                                        <br />

                                        <br />

                                        {/* {imageData} */}
                                    </div>
                                    <Input
                                        {...field}
                                        type="file"

                                        border={false}
                                        onChange={(event) => {
                                            const selectedImage = event.target.files[0]
                                            let reader = new FileReader();
                                            reader.readAsDataURL(selectedImage);
                                            reader.onload = function () {
                                                setImageData(reader.result)
                                            };
                                            console.log(selectedImage);
                                            setSelectedImage(selectedImage);
                                        }}
                                    />
                                </FormControl>

                            )}
                        </Field>


                        <Field name="NID_first_name">
                            {({ field, form }) => (

                                <FormControl isRequired>

                                    {/* TODO: Add field for image */}
                                    <FormLabel>First Name</FormLabel>
                                    <Input {...field} placeholder='First Name' />
                                </FormControl>

                            )}
                        </Field>

                        <Field name="NID_middle_name">
                            {({ field, form }) => (



                                <FormControl isRequired>
                                    <FormLabel>Middle Name</FormLabel>
                                    <Input  {...field} placeholder='Middle Name' />
                                </FormControl>

                            )}
                        </Field>
                        <Field name="NID_last_name">
                            {({ field, form }) => (
                                <FormControl isRequired>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input  {...field} placeholder='Last Name' />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="NID_dob">
                            {({ field, form }) => (

                                <FormControl isRequired>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <Input  {...field} placeholder='Date of Birth' />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="NID_birthplace">
                            {({ field, form }) => (

                                <FormControl isRequired>
                                    <FormLabel>Birthplace</FormLabel>
                                    <Input  {...field} placeholder='Birthplace' />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="NID_gender">
                            {({ field, form }) => (
                                <FormControl isRequired>
                                    <FormLabel>Gender</FormLabel>
                                    <Input {...field} placeholder='Gender' />
                                </FormControl>
                            )}
                        </Field>
                        <Field name="NID_mobile_number">
                            {({ field, form }) => (

                                <FormControl isRequired>
                                    <FormLabel>Mobile Number</FormLabel>
                                    <Input placeholder='Mobile Number' />
                                </FormControl>
                            )}
                        </Field>
                        {/* <FormControl isRequired>
                        <FormLabel>Marital Status</FormLabel>
                        <Input placeholder='Marital Status' name='NID_marital_status' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Academic Qualification</FormLabel>
                        <Input placeholder='Academic Qualification' name='NID_academic_qualification' />
                        </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Occupation</FormLabel>
                        <Input placeholder='Occupation' name='NID_occupation' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Caste</FormLabel>
                        <Input placeholder='Caste' name='NID_caste' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Religion</FormLabel>
                        <Input placeholder='Religion' name='NID_religion' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Permanent State</FormLabel>
                        <Input placeholder='State' name='NID_permanent_state' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Permanent District</FormLabel>
                        <Input placeholder='District' name='NID_permanent_district' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Permanent Local-Level (ga.pa/na.pa)</FormLabel>
                        <Input placeholder='Local-Level (ga.pa/na.pa)' name='NID_permanent_municipality' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Permanent Ward Number</FormLabel>
                        <Input placeholder='Ward Number' name='NID_permanent_ward' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Permanent Village/Tole</FormLabel>
                        <Input placeholder='Village/Tole' name='NID_permanent_tole' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Temporary State</FormLabel>
                        <Input placeholder='State' name='NID_temporary_state' />
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel>Temporary District</FormLabel>
                    <Input placeholder='District' name='NID_temporary_district' />
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel>Temporary Local-Level (ga.pa/na.pa)</FormLabel>
                        <Input placeholder='Local-Level (ga.pa/na.pa)' name='NID_temporary_municipality' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Temporary Ward Number</FormLabel>
                        <Input placeholder='Ward Number' name='NID_temporary_ward' />
                        </FormControl>
                    <FormControl isRequired>
                    <FormLabel>Temporary Village/Tole</FormLabel>
                    <Input placeholder='Village/Tole' name='NID_temporary_tole' />
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel>Father First Name</FormLabel>
                    <Input placeholder='First Name' name='NID_father_first_name' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Father Middle Name</FormLabel>
                        <Input placeholder='Middle Name' name='NID_father_middle_name' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Father Last Name</FormLabel>
                        <Input placeholder='Last Name' name='NID_father_last_name' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Father National Identity Number</FormLabel>
                        <Input placeholder='National Identity Number' name='NID_father_NIN' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Father Nationality</FormLabel>
                        <Input placeholder='Father Nationality' name='NID_father_nationality' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Mother First Name</FormLabel>
                        <Input placeholder='First Name' name='NID_mother_first_name' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Mother Middle Name</FormLabel>
                        <Input placeholder='Middle Name' name='NID_mother_middle_name' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Mother Last Name</FormLabel>
                        <Input placeholder='Last Name' name='NID_mother_last_name' />
                        </FormControl>
                    <FormControl isRequired>
                    <FormLabel>Mother National Identity Number</FormLabel>
                    <Input placeholder='National Identity Number' name='NID_mother_NIN' />
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel>Mother Nationality</FormLabel>
                    <Input placeholder='Mother Nationality' name='NID_mother_nationality' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Grandfather First Name</FormLabel>
                        <Input placeholder='First Name' name='NID_grandfather_first_name' />
                        </FormControl>
                    <FormControl isRequired>
                    <FormLabel>Grandfather Middle Name</FormLabel>
                    <Input placeholder='Middle Name' name='NID_grandfather_middle_name' />
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel>Grandfather Last Name</FormLabel>
                    <Input placeholder='Last Name' name='NID_grandfather_last_name' />
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel>Grandfather National Identity Number</FormLabel>
                    <Input placeholder='National Identity Number' name='NID_grandfather_NIN' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Grandmother First Name</FormLabel>
                        <Input placeholder='First Name' name='NID_grandmother_first_name' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Grandmother Middle Name</FormLabel>
                        <Input placeholder='Middle Name' name='NID_grandmother_middle_name' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Grandmother Last Name</FormLabel>
                        <Input placeholder='Last Name' name='NID_grandmother_last_name' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Grandmother National Identity Number</FormLabel>
                        <Input placeholder='National Identity Number' name='NID_grandmother_NIN' />
                        </FormControl>
                    <FormControl isRequired>
                    <FormLabel>Spouse First Name</FormLabel>
                    <Input placeholder='First Name' name='NID_spouse_first_name' />
                    </FormControl>
                    <FormControl isRequired>
                    <FormLabel>Spouse Middle Name</FormLabel>
                    <Input placeholder='Middle Name' name='NID_spouse_middle_name' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Spouse Last Name</FormLabel>
                        <Input placeholder='Last Name' name='NID_spouse_last_name' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Spouse National Identity Number</FormLabel>
                        <Input placeholder='National Identity Number' name='NID_spouse_NIN' />
                        </FormControl>
                        <FormControl isRequired>
                        <FormLabel>Spouse Nationality</FormLabel>
                        <Input placeholder='Spouse Nationality' name='NID_spouse_nationality' />
                    </FormControl> */}

                        <Button
                            mt={4}
                            colorScheme='blue'
                            disabled={imageData === null}
                            isLoading={props.isSubmitting}
                            loadingText='Submitting'
                            type='submit'
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container >
    )
}
