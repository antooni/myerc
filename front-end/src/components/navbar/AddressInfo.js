import React from 'react'

import { Flex, Blockie, Box, Text } from "rimble-ui"

const AddressInfo = (props) => {
    return (
        <Flex height={"100%"} alignItems={"center"}>
            <Flex width = {1/3} justifyContent='right '>
                <Blockie
                opts={{
                    seed: props.address,
                    color: "#dfe",
                    bgcolor: "#a71",
                    size: 15,
                    scale: 3,
                    spotcolor: "#000"
                }}
                />
            </Flex>
            
            <Box width = {2/3} color='white' pl={3}>
                
                <Text.span fontWeight={"bold"} fontFamily='Arial'>{props.address}</Text.span>
            
            </Box>
            

        </Flex>
    )

}

export default AddressInfo