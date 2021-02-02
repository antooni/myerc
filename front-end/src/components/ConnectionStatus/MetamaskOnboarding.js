import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';

import { MetaMaskButton } from 'rimble-ui';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

const OnboardingButton = () => {
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
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  const onClick = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      await window.ethereum.enable();
    } else {
      onboarding.current.startOnboarding();
    }
  };
  return (
    <MetaMaskButton.Outline disabled={isDisabled} onClick={onClick} /* style={{display:"none"}} */>
      {buttonText}
      </MetaMaskButton.Outline>
  );
}

export default OnboardingButton