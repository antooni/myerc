import React from 'react'

import { Flex, Blockie, Box, Text } from "rimble-ui"

const AddressInfo = () => {
    return (
        <Flex height={"100%"} alignItems={"center"}>
            <Flex width = {1/3} justifyContent='right '>
                <Blockie
                opts={{
                    seed: "foo",
                    color: "#dfe",
                    bgcolor: "#a71",
                    size: 15,
                    scale: 3,
                    spotcolor: "#000"
                }}
                />
            </Flex>
            
            <Box width = {2/3} color='white' pl={3}>
                
                <Text.span fontWeight={"bold"} fontFamily='Arial'>0x892a1AdA292E3e04b93d430608A93D19EB81378E</Text.span>
            
            </Box>
            

        </Flex>
    )

}

export default AddressInfo