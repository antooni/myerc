import React,{useState} from 'react'

import {Box, Button, Flex, Modal, Card, Heading, Text, EthAddress} from 'rimble-ui'


const Receive = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = e => {
      e.preventDefault();
      setIsOpen(false);
    };
  
    const openModal = e => {
      e.preventDefault();
      setIsOpen(true);
    };

    return (
        <React.Fragment>
            <Button disabled={props.isDisabled} onClick={openModal}/* onClick={() => props.transfer('0x4Ff16925336634E7b368eAF1094e77aC8F427175',100)} */><Text>Receive</Text></Button>

            <Modal isOpen={isOpen}>
                <Card width={"420px"} p={0}>
                    <Button.Text
                    icononly
                    icon={"Close"}
                    color={"moon-gray"}
                    position={"absolute"}
                    top={0}
                    right={0}
                    mt={3}
                    mr={3}
                    onClick={closeModal}
                    />

                    <Box p={4} mb={3}>
                        <Heading.h3><Text>Receive tokens</Text></Heading.h3>
                        <Box mb={20}>
                            <Text>This is your address</Text>
                            <EthAddress mt={30} address={props.address} />
                        </Box>
                      

                    </Box>

                    <Flex
                    px={4}
                    py={3}
                    borderTop={1}
                    borderColor={"#E8E8E8"}
                    justifyContent={"flex-end"}
                    >
                        <Button.Outline onClick={closeModal}><Text>Close</Text></Button.Outline>
                
                    </Flex>
                </Card>
            </Modal>
        </React.Fragment>
    )

}

export default Receive