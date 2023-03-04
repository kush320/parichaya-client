import { useState, useContext } from "react";
import axios from "axios";
import {
    Box,
    Button,
    useToast,
    Text,
    Center,
    Divider,
} from "@chakra-ui/react";


import { useForm } from "react-hook-form";

import AuthContext from "../store/auth-context";
import CTZForm from "./CTZForm";

export default function RegisterCTZForm({ nidData }) {
    const authContext = useContext(AuthContext);
    const toast = useToast()
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            NIN: nidData.NIN,
        }
    });




    async function onSubmit(data) {
        setIsLoading(true);
        const modifiedData = data;


        try {
            const response = await axios.post(
                "http://65.109.161.97:3000/ctz/",
                {
                    CTZ_CCN: modifiedData.CTZ_CCN,
                    documentDetails: modifiedData
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authContext.token}`
                    }
                }
            );
            reset();
            setIsLoading(false)
            toast({
                title: 'Registration Successful.',
                description: `Citizenship ${modifiedData.CTZ_CCN} Created and Linked with National Identity Number: ${modifiedData.NIN}.`,
                status: 'success',
                duration: 5000,
                isClosable: true
            });
            console.log(response.data)


        } catch (error) {
            console.log(error)
            toast({
                title: 'Registration Failed.',
                description: `Failed to register the Citizenship Card.`,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            setIsLoading(false)
        }



        setIsLoading(false);
    }

    return (
        <CTZForm
            register={register}
            nidData={nidData}
            face_image={nidData.face_image}
            full_name={nidData.first_name + " " + nidData.last_name}
            NIN={nidData.NIN}
            onSubmit={handleSubmit(onSubmit)}
            buttonText='Submit'
            isLoading={isLoading}
            buttonLoadingText='Submitting...'
        />

    );
}
