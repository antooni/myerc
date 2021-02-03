import React from 'react'

import {Box, Button, Flex} from 'rimble-ui'

import Send from './ReceiveSend/Send'
import Receive from './ReceiveSend/Receive'


const ReceiveSend = (props) => {
    return (
        <Flex width={8/10} justifyContent='space-evenly' pt={20} pb={20}>
            <Receive address={props.address}/>
            <Send transfer={props.transfer} isDisabled={props.isDisabled}/>
        </Flex>
    )

}

export default ReceiveSend