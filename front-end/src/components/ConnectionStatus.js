import React, { useEffect } from 'react'

import { Flex, Box, Text } from 'rimble-ui'
import { Icon } from "@rimble/icons";

import ConnectMetamask from './ConnectionStatus/ConnectMetamask'

let CONNECTION_TEXT = 'disconnected' //connected
let CONNECTION_ICON = 'Cancel' //CheckCircle
let CONNECTION_COLOR = 'tomato' //green


const ConnectionStatus = (props) => {

    useEffect(() => {

        if(props.isWeb3) {
            CONNECTION_TEXT = 'Ropsten'
            CONNECTION_ICON = 'CheckCircle'
            CONNECTION_COLOR = 'green'
        }
        
      }, [props.isWeb3])

    return(
        <Box width={1}>       
            <Flex width={1} justifyContent='center'  pt={10} pb={10}>
                <Flex width={8/10} flexWrap='wrap' >
                    <Box width={1}>
                        <Text>STATUS</Text>
                    </Box>
                    <Flex alignItems={"center"} width={4/10} >
                        <Icon color={CONNECTION_COLOR} name={CONNECTION_ICON} /> 
                        <Text pl={2}>{CONNECTION_TEXT}</Text>
                    </Flex>
                    <Flex width={6/10} justifyContent='center'>

                            <ConnectMetamask onChange={props.onChange} />
                        
                    </Flex>

                </Flex>
            </Flex>
        </Box>

        
    )
    

}

export default ConnectionStatus