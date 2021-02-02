import React from 'react'

import {Box, Flex} from 'rimble-ui'

import Balance from './main/Balance'
import History from './main/History'
import ReceiveSend from './main/ReceiveSend'


const Main = () => {
    return (
        <Flex width={1} justifyContent='center'>

            <Flex width={8/10} justifyContent='center' flexWrap='wrap'>
                <Balance></Balance>

                <ReceiveSend></ReceiveSend>

                <History></History>

                
            </Flex>

        </Flex>
    )

}

export default Main