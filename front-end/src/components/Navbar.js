import React from 'react'

import { Flex, Box } from 'rimble-ui'

import Brand from './navbar/Brand'
import AddressInfo from './navbar/AddressInfo'


const NavBar = () => {
    return(
        //Flex is a wrapper for a whole navbar width 100%
        <Flex width={1} bg='primary'>

            <Box width={1/3}>
                <Brand />
            </Box>

            <Box width={1/3}></Box>

            <Box width={1/3}>
                <AddressInfo />
            </Box>
        </Flex>
    )
    

}

export default NavBar