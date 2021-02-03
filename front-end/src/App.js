import './App.css';

import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";

import NavBar from './components/Navbar';
import Main from './components/Main'
import ConnectionStatus from './components/ConnectionStatus'


function App() {

  const [balance, setBalance] = useState('0')
  const [address, setAddress] = useState('[yours_eth_address]')
  const [isWeb3, setIsWeb3] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)

  const handleIsWeb3 = (isConnected) => {
    setIsWeb3(isConnected)
    setIsDisabled(false)
  }

  useEffect(async () => {

    if(isWeb3) {
      await loadBlockchainData()
    }
    
  }, [isWeb3])

  const transfer = (to, value) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const myeAddress = '0xc458d49b8696318A21eAB4D74a644E2300dC6Fbb'

    const myeAbi = [
      'function balanceOf(address _owner) external view returns (uint256 balance)',
      'function transfer(address _to, uint256 _value) external returns (bool success)'
    ]

    const myeContract = new ethers.Contract(myeAddress,myeAbi,provider)

    const myeWithSigner = myeContract.connect(signer)

    const mye = ethers.utils.parseEther(value.toString())

    const tx = myeWithSigner.transfer(to,mye)
  }

  const loadBlockchainData = async () => {

    await window.ethereum.enable()

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()

    const accounts = await provider.listAccounts()
    setAddress(accounts[0])
    
    const myeAddress = '0xc458d49b8696318A21eAB4D74a644E2300dC6Fbb'

    const myeAbi = [
      'function balanceOf(address _owner) external view returns (uint256 balance)',
      'function transfer(address _to, uint256 _value) external returns (bool success)'
    ]

    const myeContract = new ethers.Contract(myeAddress,myeAbi,provider)

    console.log(accounts[0])
    const balanceOf = await myeContract.balanceOf(accounts[0]) 

    setBalance(ethers.utils.formatEther(balanceOf))
  }

  return (
    <React.Fragment>

        <NavBar address={address}/>

        <ConnectionStatus isWeb3={isWeb3} onChange={handleIsWeb3} />

        <Main balance={balance} transfer={transfer} isDisabled={isDisabled} address={address}/>

    </React.Fragment>
    
  );
}

export default App;
