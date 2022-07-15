import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head'
import ABI from '../shared/abis/MultiRewards.json';
import ABIWAVAX from '../shared/abis/Wavax.json';
import { BigNumber, utils, Contract } from "ethers";
const Avalanche = require("avalanche").Avalanche

const ethers = require("ethers")
const privateKey = '0adfacf56302bd84381b379f8ef1f0921f3e48823bcabca32c7dc13ed9518a86'
let Web3 = require('web3');
const nodeURL = "https://api.avax-test.network/ext/bc/C/rpc"

let abiwav = ABIWAVAX
let abi = ABI

//const dataABI = await import('../shared/abis/MultiRewards.json')
const contractAddress = "0x7d9Ba5b5601518da20A0337208b2d7dA0AFc8585"  
const wavaxAddress = "0xd00ae08403B9bbb9124bB305C09058E32C39A48c"

const calcFeeData = async (
  maxFeePerGas = undefined,
  maxPriorityFeePerGas = undefined
) => {
  const baseFee = parseInt(await cchain.getBaseFee(), 16) / 1e9
  maxPriorityFeePerGas =
    maxPriorityFeePerGas == undefined
      ? parseInt(await cchain.getMaxPriorityFeePerGas(), 16) / 1e9
      : maxPriorityFeePerGas
  maxFeePerGas =
    maxFeePerGas == undefined ? baseFee + maxPriorityFeePerGas : maxFeePerGas

  if (maxFeePerGas < maxPriorityFeePerGas) {
    throw "Error: Max fee per gas cannot be less than max priority fee per gas"
  }

  return {
    maxFeePerGas: maxFeePerGas.toString(),
    maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
  }
}

function Index() {
  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)
  const [contract, setContract] = useState(null)
  const [stakedxJns, setStakedxJNS] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  const [cchain, setCChain] = useState(null)
  const [wallet, setWallet] = useState(null)
  
  
  
  

  const handleApprove = async () => {
      let contractWithSigner = contract.connect(wallet);
      let currentValue = await contractWithSigner.owner();
      console.log(currentValue);


    }
  const handleSendTransaction = async () => {
      ({ maxFeePerGas, maxPriorityFeePerGas } = await calcFeeData(
        maxFeePerGas,
        maxPriorityFeePerGas
      ))
      maxFeePerGas = ethers.utils.parseUnits(maxFeePerGas, "gwei")
      maxPriorityFeePerGas = ethers.utils.parseUnits(maxPriorityFeePerGas, "gwei")
      const tokenAmount = ethers.utils.parseUnits("0.01");
      let contractWithSigner = contract.connect(wallet);
      let tx = await contractWithSigner.notifyRewardAmount(wavaxAddress, tokenAmount);
      console.log(tx.hash);
      await tx.wait();
    }

   useEffect(() => {
      let contractloc = new ethers.Contract(contractAddress, abi, HTTPSProvider);
      setContract(contractloc);
      const HTTPSProvider = new ethers.providers.JsonRpcProvider(nodeURL)
      let walletx = new ethers.Wallet(privateKey, HTTPSProvider);
      setWallet(walletx);
      const chainId = 43113
      const avalanche = new Avalanche(
        "api.avax-test.network",
        undefined,
        "https",
        chainId
      )     
      const cchainx = avalanche.CChain()
      setCChain(cchainx);
      /* window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
        setAddress(accounts[0])
        
        setContract(contractloc);
        
      }).catch((err) => console.log(err))
    : console.log("Please install MetaMask") */
  }, []) 
    return (
      <div>
        <div>
          Welcome to your homepage {totalSupply}
        </div>
        <button type="button" onClick={handleSendTransaction}>Send Reward!</button>
        <button type="button1" onClick={handleApprove}>Approve</button>
        
      </div>
      
    )
}

export default Index