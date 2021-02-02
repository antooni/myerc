import React from 'react'

import { Flex, Box, Flash } from 'rimble-ui'
import { Icon } from "@rimble/icons";

import ConnectMetamask from './ConnectionStatus/MetamaskOnboarding'


const ConnectionStatus = () => {
    return(
        <Box width={1}>
            
            <Flex width={1} justifyContent='center'  pt={10} pb={10}>
                <Flex width={8/10} flexWrap='wrap' >
                    <Box width={1}>
                        STATUS
                    </Box>
                    <Box width={4/10} >
                    <Icon color='tomato' name="Cancel" /> disconnected
                    <Icon color='green' name="CheckCircle" /> connected

                    
                    </Box>
                    <Box width={6/10}>
                        <ConnectMetamask/>
                    </Box>

                </Flex>
            </Flex>
        </Box>

        
    )
    

}

export default ConnectionStatus