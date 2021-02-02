import React from 'react'

import {Box, Button, Flex} from 'rimble-ui'


const ReceiveSend = () => {
    return (
        <Flex width={8/10} justifyContent='space-evenly' pt={20} pb={20}>
            <Button>Receive</Button>
            <Button>Send</Button>
        </Flex>
    )

}

export default ReceiveSend