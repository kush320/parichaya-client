import { Container } from '@chakra-ui/react'
import { useForm } from "react-hook-form";

import axios from 'axios'
import {
    Input
} from '@chakra-ui/react'
import { useState } from 'react';
import { useRef } from 'react';


export default function AddNID() {
    const defaultSrc =
        "https://www.pngkit.com/png/full/301-3012694_account-user-profile-avatar-comments-fa-user-circle.png";

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const imageUploadField = useRef();
    const [selectedImage, setSelectedImage] = useState();
    const [imageData, setImageData] = useState();
    const [formData, setFormData] = useState("");


    function onSubmit(data) {
        const modifiedData = data
        modifiedData.face_image = imageData
        setFormData(JSON.stringify(modifiedData))
        console.log(modifiedData)
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>



            <label htmlFor="NIN">NIN</label>
            <Input id='NIN' {...register("NIN")} />

            <label htmlFor="NID_face_image_upload">Face Image</label>
            <div>
                {selectedImage && (
                    <div>
                        <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                        <br />
                        <button onClick={() => {
                            setSelectedImage()
                            setImageData()
                            imageUploadField.current.value = ""

                        }}>Remove</button>
                    </div>
                )}
                <br />

                <br />

                {/* {imageData} */}


                <Input
                    type="file"
                    ref={imageUploadField}

                    border={false}
                    onChange={(event) => {
                        const selectedImage = event.target.files[0]
                        // if (selectedImage.size > 1) {
                        //     alert("File size is too big!")
                        //     event.target.value = "";
                        //     return;

                        // }
                        let reader = new FileReader();
                        reader.readAsDataURL(selectedImage);
                        reader.onload = function () {
                            setImageData(reader.result)
                            console.log(reader.result)
                            setSelectedImage(selectedImage);
                        };
                        console.log(selectedImage);
                    }}
                />
            </div>


            <input type="submit" />
            {formData}
        </form>

    )
}
