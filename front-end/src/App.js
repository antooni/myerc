import './App.css';

import React, { useState, useEffect } from 'react';
import { ethers } from "ethers";

function App() {

  const [balance, setBalance] = useState()

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = provider.getSigner()

    const myeAddress = '0x643549805E622770Fc3200C3cdA83d91C108BFa8'

    const myeAbi = [
      '    function balanceOf(address _owner) external view returns (uint256 balance)'
    ]

    const myeContract = new ethers.Contract(myeAddress,myeAbi,provider)

    const balanceOf = await myeContract.balanceOf('0x892a1AdA292E3e04b93d430608A93D19EB81378E') 

    setBalance(ethers.utils.formatEther(balanceOf))

    console.log(window.ethereum)
  }

  return (
    <div>
      {balance}
    </div>
  );
}

export default App;
