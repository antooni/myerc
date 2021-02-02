import React from 'react'

import {Box, Flex, Table, Button} from 'rimble-ui'

import HistoryLine from './History/HistoryLine'

const History = () => {
    return (
        <React.Fragment>
            <Box width={1} pt={20} pb={20}>
                HISTORY
                <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Value</th>
                        <th>Recipient</th>
                        <th>Time</th>
                    </tr>
                </thead>
                    <HistoryLine></HistoryLine>
                </Table>
            </Box>

            <Flex width={1} justifyContent='center'>
                <Button>
                    view more
                </Button>
            </Flex>
        </React.Fragment>
       
    )
}

export default History