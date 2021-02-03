import React from 'react'

import {Box, Flex} from 'rimble-ui'

import Balance from './main/Balance'
import History from './main/History'
import ReceiveSend from './main/ReceiveSend'


const Main = (props) => {
    return (
        <Flex width={1} justifyContent='center'>

            <Flex width={8/10} justifyContent='center' flexWrap='wrap'>
                <Balance balance={props.balance}></Balance>

                <ReceiveSend transfer={props.transfer} isDisabled={props.isDisabled} address={props.address}></ReceiveSend>

                <History isDisabled={props.isDisabled}></History>

                
            </Flex>

        </Flex>
    )

}

export default Main