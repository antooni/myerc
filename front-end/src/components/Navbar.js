import React from 'react'

import { Flex, Box } from 'rimble-ui'

import Brand from './navbar/Brand'
import AddressInfo from './navbar/AddressInfo'


const NavBar = (props) => {
    return(
        
        <Flex width={1} bg='primary' pt={10} pb={10}>

            <Box width={1/3}>
                <Brand />
            </Box>

            <Box width={1/3}></Box>

            <Box width={1/3}>
                <AddressInfo address={props.address}/>
            </Box>
        </Flex>
    )
    

}

export default NavBar