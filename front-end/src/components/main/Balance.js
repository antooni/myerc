import React from 'react'

import {Box, Card, Text} from 'rimble-ui'


const Balance = (props) => {
    return (
        <Box width={1} pt={20} pb={20}>
            <Box width={1}>
                <Text>BALANCE</Text>
            </Box>
            <Box width={1}>
                <Card textAlign='center'><Text>{props.balance} PZP</Text></Card>
            </Box>
        </Box>
    )

}

export default Balance