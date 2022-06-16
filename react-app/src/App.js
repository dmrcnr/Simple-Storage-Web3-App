import './App.css';
import React,{useState} from "react"
import Web3 from 'web3';
import {simpleStorageAbi} from "./abis.js"

function App() {
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  const contractAddr = "0x2095098300605A1b1E76c4c1A0b5A9c6FE51bA4c";
  const simpleContract = new web3.eth.Contract(simpleStorageAbi,contractAddr);
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState('0x00');

  const handleGet = async (e) => {
    e.preventDefault();
    const result = await simpleContract.methods.get().call();
    setGetNumber(result);
    console.log(result);
  }

  const handleSet = async (e) => {
    e.preventDefault();
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await simpleContract.methods.set(number).estimateGas();
    const result = await simpleContract.methods.set(number).send({
      from:account,
      gas
    });
    console.log(result);
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSet}>
          <label>
            Set Number:
            <input type="text" name="name" value={number} onChange={e => setNumber(e.target.value)}/>
          </label>
          <input type="submit" value="Set Number"/>
        </form><br/>
        <button onClick={handleGet} type="button">
          Get Number
        </button>
        {getNumber}
      </header>
    </div>
  );
}

export default App;
