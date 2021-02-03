import React from 'react'

import {Box, Card} from 'rimble-ui'


const Balance = (props) => {
    return (
        <Box width={1} pt={20} pb={20}>
            <Box width={1}>
                BALANCE
            </Box>
            <Box width={1}>
                <Card textAlign='center'>{props.balance} PZP</Card>
            </Box>
        </Box>
    )

}

export default Balance