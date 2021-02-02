import './App.css';

import React, { useState, useEffect, useContext, createContext } from 'react';
import { ethers } from "ethers";

import NavBar from './components/Navbar';
import Main from './components/Main'
import ConnectionStatus from './components/ConnectionStatus'


function App() {

  const [balance, setBalance] = useState('')
  const [address, setAddress] = useState('')
  const isMetamaskConnected = React.createContext(false)

  useEffect(async () => {


    //await loadBlockchainData()
  }, [])

  const loadBlockchainData = async () => {

    await window.ethereum.enable()

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      const _address = await provider.listAccounts()
      setAddress(_address[0])
    
    const myeAddress = '0x643549805E622770Fc3200C3cdA83d91C108BFa8'

    const myeAbi = [
      '    function balanceOf(address _owner) external view returns (uint256 balance)'
    ]

    const myeContract = new ethers.Contract(myeAddress,myeAbi,provider)

    const balanceOf = await myeContract.balanceOf(_address[0]) 

    setBalance(ethers.utils.formatEther(balanceOf))
  }

  return (
    <React.Fragment>

        <NavBar/>

        <ConnectionStatus />

        <Main/>

    </React.Fragment>
    
  );
}

export default App;
