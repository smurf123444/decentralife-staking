import "./styles.css";
import React, { useState, Component } from 'react'
import Table from 'react-bootstrap/Table';
import TokenFarm from '../../assets/TokenFarm.json'
import Button from 'react-bootstrap/Button';
import App from "../App";
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/' + '885661b2ff2f4167b4c6570a07306408'));




let personalAccount = 0
let valueEth = 0
let transactionTimestamp = 0
const tokenFarm = new web3.eth.Contract(TokenFarm, '0x075e4F66C4D53DD2d37b91BD7382b34F3B681B4f')
class TransactionChecker {
  web3;
  account;

  constructor(projectId, account) {
      this.web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/' + '885661b2ff2f4167b4c6570a07306408'));
      this.account = account.toLowerCase();
  }

  async checkBlock() {
      //let block = await this.web3.eth.getBlock(1920050);
      //let number = block.number;
      
      let i = 22682754;
      while (i < 22682764) {
          i++;
          let block = await this.web3.eth.getBlock(i);
          let number = block.number;

         // console.log('Searching block ' + number);
      if (block != null && block.transactions != null) {
        //  console.log(block.timestamp)


          for (let txHash of block.transactions) {
              //contract : 0x075e4f66c4d53dd2d37b91bd7382b34f3b681b4f
              let tx = await this.web3.eth.getTransaction(txHash);
             // console.log(block.timestamp)
              let time = block.timestamp
              let timeConfigured = new Date(time*1000);
              let accounts =  await this.web3.eth.getAccounts()
            if (tx.to != null)
            {
            if ('0x075e4f66c4d53dd2d37b91bd7382b34f3b681b4f' == tx.to.toLowerCase()) {
                //  console.log('Transaction found on block: ' + number);
                  valueEth = await this.web3.utils.fromWei(tx.value, 'ether')
                  transactionTimestamp = timeConfigured.toUTCString()
                
                  return ({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), block: number});
              }
          }
        }
      }
  }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
}





function myDay() {
  var newArray = []
  for (var i = 351; i >= 1; --i)
  {
   newArray.push (<tr><td key={i}>{i} / 351</td></tr>)
  }
  return newArray;
}




function myAvailableHex() {
  var newArray = []
  var amount = ""
  for (var i = 350; i >= 1; --i)
  {
    if(i >= 20)
    {
      amount = "500m"
      newArray.push (<tr><td>{amount}</td></tr>)
    }
    if(i <= 19 && i >= 1)
    {
      amount = "525m"
      newArray.push (<tr><td>{amount}</td></tr>)
    }
    if(i < 2 && i >= 1)
    {
      amount = "1.5b"
      newArray.push (<tr><td>{amount}</td></tr>)
    }
  }
  return newArray;   // The function returns the product of p1 and p2
}




function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
};




function myTotalEth(eth, day) {
  var newArray = []
  let i = 351
  let s = 351 - day + 1
  console.log(day)
do{
    if(s >= i && s <= i){
   newArray[i--] = <tr><td className="td-height">{eth}</td></tr>
    }
    else{
    newArray[i--] = <tr><td className="td-height"></td></tr>
    }
  }
  while(i > 0)
  return newArray;   // The function returns the product of p1 and p2
}




function hexToETHfunc(eth, day) {
  var newArray = []
  let i = 351
  let s = 351 - day + 1
  console.log(day)
do{
    if(s >= i && s <= i){
   newArray[i--] = <tr><td className="td-height">{eth} HEX / 1 ETH</td></tr>
    }
    else{
    newArray[i--] = <tr><td className="td-heightDim">Closed</td></tr>
    }
  }
  while(i > 0)
  return newArray;   // The function returns the product of p1 and p2
}




function closingBool(day) {
  var newArray = []
  let i = 351
  let s = 351 - day + 1
  console.log(day)
  let string = ""
  do{
   if(s >= i && s <= i)
  {
    string = "Open"
    console.log(s)
    newArray[i--] = (<tr><td className="td-height">{string}</td></tr>)
  }
  else{
    string = "Closed"
    newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)

  }

  }
  while(i > 0)

  return newArray;   // The function returns the product of p1 and p2
}





function yourHEXcalc(hex, day) {
  let i = 351
  let s = 351 - day + 1
  let newArray= [];
  let string = ""

  let string3 = ""
  //slet string3 = ""
  let txChecker = new TransactionChecker(process.env.INFURA_ID, '0x5bC8bf5A75D221fF30b2c2B2a7235D6aeEFF4A84');

    txChecker.checkBlock();
  do{
   if(s >= i && s <= i)
  {
    string = hex
    newArray[i--] = (<tr><td className="td-height">{string}</td></tr>)
  }
  else{
    string = ""
    newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)
  }
  }
  while(i > 0)
  return newArray;   // The function returns the product of p1 and p2
}


function yourETHcalc(hex, day) {
  let i = 351
  let s = 351 - day + 1
  let newArray= [];
  let string = ""
  do{
    if(s >= i && s <= i)
   {
     string = hex
     newArray[i--] = (<tr><td className="td-height">{string}</td></tr>)
   }
   else{
     string = ""
     newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)
   }
   }
   while(i > 0)
   return newArray;   // The function returns the product of p1 and p2
}
 



var transformer = null;


function yourButtoncalc(day,account,eth) {

  console.log('day: ' + day + ' account: ' + account+' eth: '+eth);
  
  let i = 351
  let initial = i + 1;
  var s = 0
  s = 351 - day + 1;

  let newArray= [];
  let string = ""
  
  do{
    day++;

    if(eth[i] !== null && eth[i] === true)

    {
   
      console.log(eth[i])
      s = 351 - day + 1;

      newArray[i--] = (<tr><td className="form-button-height">   
                          <form className="form-button-height" id={s} onSubmit={(event) => {
                            
                            event.preventDefault()

                            account(parseInt(event.target.getAttribute("id")));

                            }}>

                            <button type="submit" className="form-button-height">Exit!</button>
                            </form></td></tr>
                      )
                      
   }
   
 
   else if(eth[i] !== true){
     string = ""
     newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)
   }

   }
    while(i > 0) 
  
           // The function returns the product of p1 and p2
return newArray;
}


class TransformTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      day : this.props.day
    };
    this.xfLobbyExit = this.xfLobbyExit.bind(this);
    transformer = this;
    
  }
  componentDidMount(){
    transformer = this;
  }
  componentWillUnmount(){
    transformer = null;
  }

  // xfLobbyExit(){
  //   console.log('Came to this object ')
  //   this.props.xfLobbyExit(this.state.day);
  // }

  xfLobbyExit(s){
    console.log('Came to this object ')
    this.props.xfLobbyExit(s);
  }

  
  render() {
    console.log(this.props.account)
    
    return (
      
        <Table striped bordered variant="dark">

          <thead>
            <tr>
              <td>
                Day
              </td>
              <td>
                Available Hex
              </td>
              <td>
                Total ETH
              </td>
              <td>
                HEX/ETH
              </td>
              <td>
                Closing
              </td>
              <td>
                Your HEX
              </td>
              <td>
                
                Your ETH
              </td>
              <td>

              </td>
            </tr>
          </thead>
          <tbody>

                      <tr>
                        <td>
                        {myDay()}
                        </td>
                        <td>
                          {myAvailableHex()}
                        </td>
                        <td>
                          {myTotalEth(this.props.totalEth, this.props.day)}
                        </td>
                        <td>
                          {hexToETHfunc(this.props.hexToEth, this.props.day)} 
                        </td>
                        <td>
                         {closingBool(this.props.day)}
                        </td>
                        <td>
                          {yourHEXcalc(this.props.yourHex, this.props.day)}
                        </td>
                        <td>
                          {yourETHcalc(this.props.yourEth, this.props.day)}
                        </td>

                        <td>
                      
                        {yourButtoncalc(this.props.day, this.xfLobbyExit,this.props.yourButton)}

</td>

</tr>   
       </tbody>
      </Table>
    );
  }
  
}

export default TransformTable;
