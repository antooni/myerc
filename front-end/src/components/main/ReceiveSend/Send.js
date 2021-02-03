import React, {useState} from 'react'

import {Box, Button, Flex, Modal, Card, Heading, Text, Input, Form} from 'rimble-ui'


const Send = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = e => {
      e.preventDefault();
      setIsOpen(false);
    };
  
    const openModal = e => {
      e.preventDefault();
      setIsOpen(true);
    };

    const [inputAddress, setinputAddress] = useState()
    const [inputValue, setinputValue] = useState()

    const handleInputAddress = e => {
        setinputAddress(e.target.value);
    }

    const handleInputValue = e => {
        setinputValue(e.target.value);
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        console.log("Transfer " + inputValue + " to " + inputAddress);
        props.transfer(inputAddress,inputValue);
    };

    return (
        <React.Fragment>
            <Button disabled={props.isDisabled} onClick={openModal}/* onClick={() => props.transfer('0x4Ff16925336634E7b368eAF1094e77aC8F427175',100)} */><Text>Send</Text></Button>

            <Modal isOpen={isOpen}>
                <Form onSubmit={handleSubmit}>
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
                        <Heading.h3>Send tokens</Heading.h3>
                        <Box mb={20}>
                            <Text>Recipient</Text>
                            <Text>
                            <Input
                            onChange={handleInputAddress}
                            type="text"
                            required={true}
                            placeholder="e.g. 0xAc03BB73b6a9e108530AFf4Df5077c2B3D481e5A"
                            />
                            </Text>
                            
                        </Box>
                        

                        <Text>Amount</Text>
                        <Text>
                        <Input 
                        onChange={handleInputValue}
                        type="number" 
                        required={true} 
                        placeholder="e.g. 17" 
                        />
                        </Text>
                        

                    </Box>

                    <Flex
                    px={4}
                    py={3}
                    borderTop={1}
                    borderColor={"#E8E8E8"}
                    justifyContent={"flex-end"}
                    >
                        <Button.Outline onClick={closeModal}>Cancel</Button.Outline>
                        <Button type="submit" ml={3}>Send</Button>
                
                    </Flex>
                </Card>
                </Form>
            </Modal>
        </React.Fragment>
    )

}

export default Send