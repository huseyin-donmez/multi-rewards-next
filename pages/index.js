import React, { useCallback, useState, useEffect } from 'react';
import Head from 'next/head'
import ABI from '../shared/abis/MultiRewards.json';
import ABIWAVAX from '../shared/abis/Wavax.json';
import { BigNumber, utils, Contract } from "ethers";

let Web3 = require('web3');

//const dataABI = await import('../shared/abis/MultiRewards.json')


function Index() {
  const [web3, setWeb3] = useState(null)
  const [address, setAddress] = useState(null)
  const [contract, setContract] = useState(null)
  const [stakedxJns, setStakedxJNS] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)
  
  let abiwav = ABIWAVAX
  let abi = ABI
  const contractAddress = "0x7d9Ba5b5601518da20A0337208b2d7dA0AFc8585"  
  const wavaxAddress = "0xd00ae08403B9bbb9124bB305C09058E32C39A48c"

  const handleApprove = async () => {
      const rewardWeix = Web3.utils.toWei('10', 'ether');
      const wavaxcontract = new web3.eth.Contract(abiwav, wavaxAddress)
      wavaxcontract.methods.approve(contractAddress, rewardWeix).send({from:'0x7F4940A7363e11f0f7C34e430338ed95A1D7a7bf'}).then((receipt) => {
          
        console.log(receipt)
        })

  }
  const handleSendTransaction = () => {
      
      const rewardWei = Web3.utils.toWei('0.001', 'ether');
      
      contract.methods.notifyRewardAmount("0x1D308089a2D1Ced3f1Ce36B1FcaF815b07217be3",rewardWei).send({from: '0x7F4940A7363e11f0f7C34e430338ed95A1D7a7bf'}).then((receipt) => {
          
      console.log(receipt)
      })
    }

  useEffect(() => {
    window.ethereum ?
      ethereum.request({ method: "eth_requestAccounts" }).then((accounts) => {
        setAddress(accounts[0])
        let w3 = new Web3(ethereum)
        setWeb3(w3)
        let c = new w3.eth.Contract(abi, contractAddress)
        setContract(c)
        contract.methods.owner().call().then((_balance) => {
          // Optionally set it to the state to render it using React
          setTotalSupply(_balance)
          console.log(_balance)
        }).catch((err) => console.log(err))
      }).catch((err) => console.log(err))
    : console.log("Please install MetaMask")
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