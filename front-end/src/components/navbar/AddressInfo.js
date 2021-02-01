import React from 'react'

import { Flex, Blockie, Box } from "rimble-ui"

const AddressInfo = () => {
    return (
        <Flex>
            <Box width = {1/3}>
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
            </Box>
            
            <Box width = {2/3}>
                <span>
                0x892a1AdA292E3e04b93d430608A93D19EB81378E
                </span>
            
            </Box>
            

        </Flex>
    )

}

export default AddressInfo