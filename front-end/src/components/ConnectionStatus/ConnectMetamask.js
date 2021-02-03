import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';

import { MetaMaskButton, Text } from 'rimble-ui';
import { ethers } from "ethers";

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

const ConnectMetamask = (props) => {
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const onboarding = React.useRef();

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        props.onChange(true);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  React.useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.off('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      await window.ethereum.enable();
      props.onChange(true);
    } else {
      onboarding.current.startOnboarding();
    }
  };
  return (
    <MetaMaskButton.Outline disabled={isDisabled} onClick={onClick} /* style={{display:"none"}} */>
      <Text>{buttonText}</Text>
    </MetaMaskButton.Outline>
  );
}

export default ConnectMetamask