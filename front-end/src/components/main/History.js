import React from 'react'

import {Box, Flex, Table, Button, Text} from 'rimble-ui'

import HistoryLine from './History/HistoryLine'

const History = () => {
    return (
        <React.Fragment>
            <Box width={1} pt={20} pb={20}>
                <Text>HISTORY</Text>


            </Box>

            <Flex width={1} justifyContent='center'>
                <Button>
                    <Text>view more</Text>
                </Button>
            </Flex>
        </React.Fragment>
       
    )
}

export default History