import { useState } from "react";
import {
    Box,
    Heading,
} from "@chakra-ui/react";

import RegisterCTZForm from "./RegisterCTZForm";
import SearchNID from "./SearchNID";

export default function RegisterCTZ() {
    const [nidData, setNidData] = useState(null)


    return (
        <Box>
            <Box px={{ base: 10, lg: 32 }} my={10}>

                <Heading size='lg'>
                    Citizenship Registration
                </Heading>
            </Box>
            {!nidData && <SearchNID setSearchResult={setNidData} />}
            {nidData && <RegisterCTZForm nidData={nidData} />}
        </Box>

    );
}
