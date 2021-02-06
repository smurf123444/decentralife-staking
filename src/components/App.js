import React, { Component, useState } from 'react'
import Web3 from 'web3'

import GetXfCompEntersAndExit from './Loaders/getXfCompEntersAndExit'
import GetXfExits from './Loaders/getXfExits'
import GetStakeEnd from './Loaders/getStakeEnd'
import GetStakeCompStartAndEnd from './Loaders/getStakeCompStartAndEnd'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";

import TokenFarm from '../assets/TokenFarm.json'
import CanvasJSReact from '../assets/canvasjs.react';
import Main from './Main'
import TransformList from './TransformLobby/TransformList'
//import decodeClaim from './Test'
import { onError } from "@apollo/client/link/error";
import './App.css'
import Logo from '../dai.png'
import PopupXf from './TransformLobby/PopupXf';
import PopupStakeEnd from './Loaders/PopupStakeEnd.js'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
//require('./hexDecoders.js');
let JSONarray = []


/*
THIS IS FOR FINDING THE 
1. XFAMOUNT EARNED.
{

xfLobbyExits(where: {memberAddr: "0x5bc8bf5a75d221ff30b2c2b2a7235d6aeeff4a84"}){
  id
  timestamp
	xfAmount
  memberAddr
  data0
}
    
  
}

THIS IS FOR FINDING THE 
1. RAW ETH AMOUNT INPUT FOR XFDAY
2. THE DAY IT SELF.
    xfLobbyEnters(where: {memberAddr: "0x5bc8bf5a75d221ff30b2c2b2a7235d6aeeff4a84"}){
  id
  timestamp
  memberAddr
  data0
    rawAmount
    enterDay
}
  
THIS IS FOR FINDING
1. Staked Days
2. Amount staked
3. End Day

  stakeStarts(where: {stakerAddr: "0x5bc8bf5a75d221ff30b2c2b2a7235d6aeeff4a84"}) {
    id
    stakerAddr
    stakeId
    data0
    stakedDays
    stakeShares
    startDay
    endDay
    stakedHearts
  }

THIS IS FOR FINDING
1.servedDays 
2. penalty paid
3. Stake Payout.
{

  stakeEnds(where: {stakerAddr: "0x5bc8bf5a75d221ff30b2c2b2a7235d6aeeff4a84"}) {
    id
    stakerAddr
    stakedHearts
    payout
    penalty
    daysLate
    servedDays
    stakedHearts
    stakedShares
    prevUnlocked
  }
}



*/


class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      dappToken: {},
      dappTokenBalance: '0',
      burned: '0',
      currentDay: '0',
      tokenFarm: {},
      totalEthXL: '0',
      hexToEth: '0',
      yourHex:'0',
      yourEth: '0',
      yourExitButton: '0',
      yourEnterButton: '0',
      yourButtonDay: '0',
      yourAddress:'0x0',
      xfLobbyMembers: '0',
      totalSupply: '0',
      initSupply: '0',
      loading: true,
      showPopup: false 
      };
    this.exitDay = this.exitDay.bind(this);
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/' + '885661b2ff2f4167b4c6570a07306408'));
  }
  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
     }  
  web3;
  account;
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.initiate()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
 
    const tokenFarm = new web3.eth.Contract(TokenFarm, '0x691F261b92146bD2b88DFb2CEE9344D2393918a7')
    this.setState({ tokenFarm })
      let i = 351

 // Load State Variables.
      let personalBalance = await tokenFarm.methods.balanceOf(this.state.account).call()
     
      let totalSupply_ = await tokenFarm.methods.totalSupply().call()
      let day = await tokenFarm.methods.currentDay().call()
      let yourAddress_ = accounts[0]
      let burned = await tokenFarm.methods.burnInfo(accounts[0]).call()
      console.log(burned[1])
      this.setState({ account: yourAddress_.toString()})
      this.setState({ dappTokenBalance:  (personalBalance / 100000000).toString()})
      this.setState({ currentDay:  day.toString()})
      this.setState({ yourAddress:  yourAddress_.toString()})
      this.setState({ burned: (burned[1] / 100000000).toString() })
      this.setState({ totalSupply: totalSupply_.toString()})

  }

  
  async loadWeb3() {
    
    console.log(this.state.account)
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
  async checkBlock() {

    //let block = await this.web3.eth.getBlock(1920050);
    //let number = block.number;
    let i = 22682745;
    let to = 0
    while (i < 22769388 ) {
        i++;
        let block = await this.web3.eth.getBlock(i);
        let number = block.number;
       // console.log('Searching block ' + number);
    if (block != null && block.transactions != null) {
      //  console.log(block.timestamp)
  
  
        for (let txHash of block.transactions) {
            //contract : 0x075e4f66c4d53dd2d37b91bd7382b34f3b681b4f
            let tx = await this.web3.eth.getTransaction(txHash);
            let time = block.timestamp
            let timeConfigured = new Date(time*1000);
            console.log("SEARCHING...")
            console.log(this.state.account + " " + tx.from.toLowerCase() + " " + timeConfigured)
          if (tx.to != null)
          {
          if ('0x075e4f66c4d53dd2d37b91bd7382b34f3b681b4f' === tx.to.toLowerCase() && this.state.account.toLowerCase() === tx.from.toLowerCase()) {
                console.log('Transaction found on block: ' + number);
                console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: timeConfigured});
                JSONarray[to++] = ({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: timeConfigured})
            }
        }
      }
    }
  }

  //set up new array to use the JSON array and take the timestamp and compare with the timestamp of the contract start day to get a proper day calibration.

  }

  async initiate(){
    
    let i = 351
    const web3 = window.web3
    
    const tokenFarm = new web3.eth.Contract(TokenFarm, '0x691F261b92146bD2b88DFb2CEE9344D2393918a7')
    let currentDay = await tokenFarm.methods.currentDay().call()
    
    let currentReversed = 351 - currentDay
    function myTotalHex() {
      var newArray = []
      var amount = ""
     for (var i = 351; i >= 1; --i)
     {
     if(i > 19)
     {
     amount = 500000000
     newArray.push (amount)
     }
     if(i <= 19 && i >= 2)
     {

     amount = 525000000
     newArray.push (amount)
     }
     if(i >= 1 && i < 2)
     {
     amount = 1500000000
     newArray.push (amount)
     }
 }
 return newArray;   // The function returns the product of p1 and p2
}
i = 351
     //gives total ETH from current day.
    let totalEth = await tokenFarm.methods.xfLobby(currentDay).call()
    
     //variable for totalEthByDay to make array with date and value of that day.
     let totalEthByDay = []
     let personalEthByDay = 0
     let checkTotalEthByDay = []
     let checkPersonalEthByDay = []
     //total hex for all days available (hardcoded)
     let hexAvailableArray = myTotalHex();
     //variable to convert Eth by day times amount available for whats left to transform on that day.
     let hexToEthDisplay = 0
     
     //Used to store today's value that has value stored (kinda simplistic)
     let hexToEth = []
     let yourHex = []
     let yourEth = []

     let tempValue = 0
     let checkCurrentDay = []

     let xfLobbyMembersWrite = []
     let xfLobbyMembersRead = []

    // personalEthByDay = await tokenFarm.methods.xfLobbyPendingDays(this.state.account).call()
//Check each day for for total Eth spent on that day.
     while (i >= 1)
     {
      if(xfLobbyMembersRead[i] > 0)
      {
     
        xfLobbyMembersWrite[i] = true
      }
      else
      {
        xfLobbyMembersWrite[i]  = false
      }
      if(currentReversed === i)
      {
        checkCurrentDay[349 - i + 1] = true
      }
      else
      {
        checkCurrentDay[349 - i + 1] = false
      }
       //add items to array that include that day as the ID and t  ransferValue for value.
      totalEthByDay[i] = await tokenFarm.methods.xfLobby(i).call()
       
      // console.log(personalEthByDay + " : OUTPUTSS")
       //if the total Eth variable is 0, then display the amount of ether on that specific day.
       if(totalEthByDay[i] > 0){
    
         //equation to change amount of hex available for the day and personal.
       tempValue = parseInt(hexAvailableArray[351 - i]) * totalEthByDay[i]
       //one variable is true, other is false
       hexToEth[i] = hexAvailableArray[351 - i] - (parseInt(hexAvailableArray[351 - i]) * Web3.utils.fromWei(totalEthByDay[i], "Ether"))
       //both variables are untrue
    
       yourEth[i] = Web3.utils.fromWei(totalEthByDay[i], "Ether")
      // hexToEth = hexAvailableArray[351 - i] * Web3.utils.fromWei(totalEthByDay, "Ether")
       checkTotalEthByDay[351 - i + 1] = true
       }
       else
       {
         hexToEth[i] = hexAvailableArray[351 - i] * 1

         yourEth[i] = 0
         checkTotalEthByDay[351 - i + 1] = false
         
       }
     //  console.log(personalEthByDay)
       if(yourEth[i] > 0){
         
         yourHex[i] = hexAvailableArray[351 - i] * yourEth[i]
       //  console.log(yourHex[i])
         checkPersonalEthByDay[351 - i + 1] = true
       }
       else{
         yourHex[i] = 0
         checkPersonalEthByDay[351 - i + 1] = false
       }
       i--
     }
     
  
 
     this.setState({ yourHex:  yourHex[currentDay].toString()})
     this.setState({ yourEth:  yourEth[currentDay].toString()})
     this.setState({ yourExitButton:  checkTotalEthByDay})
     this.setState({ yourEnterButton:  checkCurrentDay})
     this.setState({ xfLobbyMembers:  xfLobbyMembersWrite})
     this.setState({ totalEthXL:  totalEth.toString()})
     this.setState({ hexToEth:  hexToEth[currentDay].toString()})
  }

  changeFirst = (newValue) => {
    this.setState({
      yourButtonDay: newValue,
    })
  }


  stakeTokens = (amount, day) => {
//    this.state.tokenFarm.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenFarm.methods.stakeStart(amount, day).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
 //   })
  }
  

  unstakeTokens = (stakeIDparam, stakeID) => {
    this.state.tokenFarm.methods.stakeEnd(stakeIDparam, stakeID).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }
//!!!!!!
  exitDay = (day) => {
    let s = 351 - day + 1;
    console.log('Came to ExitDay Function and DAY is ', s - this.state.currentDay);
    console.log(s - this.state.currentDay)
    this.state.tokenFarm.methods.xfLobbyExit(s - this.state.currentDay, '0').send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  enterDay = (value) => {
    this.state.tokenFarm.methods.xfLobbyEnter(this.state.account).send({ from: this.state.account, value: value}).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  
  getPopup = (input1, input2) => {
    let popUpStakeEnd
    if(!this.state.loading) {
      popUpStakeEnd = <p id="loader" className="text-center">Loading...</p>
    } else {
      popUpStakeEnd =
      <div>  
          <button onClick={this.togglePopup.bind(this)}> <center>End </center></button>  
          {this.state.showPopup ? <PopupStakeEnd  text='X' closePopup={this.togglePopup.bind(this)} func={this.unstakeTokens} stakeIndex={input1} stakeID={input2}/> : null }  
      </div>  
    }
    return popUpStakeEnd
  }


  render() {
    const { account, dappToken, burned, currentDay, totalEthXL, hexToEth, yourHex, yourEth, yourExitButton, yourAddress, yourEnterButton, totalSupply, initSupply, xfLobbyMembers, loading} = this.state;
    let initSupply_ = Web3.utils.fromWei(initSupply, "Gwei")
    let totalSupply_ = Web3.utils.fromWei(totalSupply, "Gwei")
    console.log(this.state.currentDay)
    const errorLink = onError(({ graphqlErrors, networkError }) => {
      if (graphqlErrors) {
        graphqlErrors.map(({ message, location, path }) => {
          alert(`Graphql error ${message}`);
        });
      }
    });
//https://api.thegraph.com/subgraphs/name/smurf123444/decentralife
    const link = from([
      errorLink,
      new HttpLink({ uri: "https://api.thegraph.com/subgraphs/name/smurf123444/decentralife" }),
    ]);
    
    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: link,
    });

   

    const options = {
			theme: "light",
			animationEnabled: true,
			exportFileName: "TITY",
			exportEnabled: true,
			title:{
				text: "Token Burn Pie Chart"
			},
			data: [{
        type: "pie",
        startAngle:  90,
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}</strong>",
				indexLabel: "{y}",
				indexLabelPlacement: "inside",
				dataPoints: [
          { y: totalSupply_, label: "In Circulating Supply" },
          { y: burned, label: "Burned" },

				]
			}]
		}

    let popUpXf
    if(!this.state.loading) {
      popUpXf = <p id="loader" className="text-center">Loading...</p>
    } else {
      popUpXf =
      <div>  
          <h1> Simple Popup Example </h1>  
          <button onClick={this.togglePopup.bind(this)}> Click To Open</button>  
          {this.state.showPopup ? <PopupXf  text='X' closePopup={this.togglePopup.bind(this)} /> : null }  
      </div>  
    }


    let content
    if(!this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        dappTokenBalance={this.state.dappTokenBalance}
        
        totalSupply={this.state.totalSupply}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
        account={this.state.account}
      />
    }
    let xfLobbyEnters
    if(!this.state.loading) {
      xfLobbyEnters = <p id="loader" className="text-center">Loading...</p>
    } else {
      xfLobbyEnters =
      <ApolloProvider client={client}>
        <GetXfCompEntersAndExit
        account={this.state.account}
      />
      </ApolloProvider>
    }
    let xfLobbyExits
    if(!this.state.loading) {
      xfLobbyExits = <p id="loader" className="text-center">Loading...</p>
    } else {
      xfLobbyExits =
      <ApolloProvider client={client}>
        <GetXfExits
        account={this.state.account}
      />
      </ApolloProvider>
    }



    let stakeComp
    if(!this.state.loading) {
      stakeComp = <p id="loader" className="text-center">Loading...</p>
    } else {
      stakeComp =
      <ApolloProvider client={client}>
        <GetStakeCompStartAndEnd account={this.state.account} func={this.getPopup} func2={this.unstakeTokens} />
      </ApolloProvider>
    }


    let stakeEnds
    if(!this.state.loading) {
      stakeEnds = <p id="loader" className="text-center">Loading...</p>
    } else {
      stakeEnds =
      <ApolloProvider client={client}>
        <GetStakeEnd account={this.state.account}/>
      </ApolloProvider>
    }




    return (
      
      <div>
                      <Router>
        <div>
    <nav>
      <h3>

      </h3>
      <h1 class="margin-right">Day : {this.state.currentDay}</h1>
      <ul className="nav-links">
            <li>
              <Link to="/" exact>Home</Link>
            </li>
            <li>
              <Link to="/stake">Stake</Link>
            </li>
            <li>
              <Link to="/transform">Transform</Link>
            </li>
            <li>
              <Link to="/transfer">Transfer</Link>
            </li>
      </ul>
    </nav>

    </div>

              <Switch>


          <Route path="/stake">




        <div>
          <center>

            <h3>Current Stakes</h3>
          </center>
        </div>
        {stakeComp}
        <div>
          <center>

            <h3>Ended Stakes</h3>
          </center>
        </div>
         {stakeEnds}





          <div className="container-fluid mt-5">
          <div className="row">

            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>

              <div className="content mr-auto ml-auto">

              

                {content}
                <h1>Amount in Circulation</h1>
                <h1>{ totalSupply_ } </h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}

              </div>

            </main>
          </div>
        </div>
          </Route>
          <Route path="/transform">
            <h1 class="margin-left">Enters</h1>
            {xfLobbyEnters}
            <h1 class="margin-left">Exits</h1>
            {xfLobbyExits}
            <div>
              <center>
            <h1 class="margin-right-emoji">⬇️Scroll Down to Day {this.state.currentDay}⬇️</h1>
            </center>
            </div>
          <TransformList 
          day={currentDay}
          ethTransformed={this.props.ethTransformed} 
          totalEth={Web3.utils.fromWei(totalEthXL, "ether")} 
          hexToEth={hexToEth} 
          closing={currentDay}
          yourAddress={yourAddress}
          yourHex={yourHex}
          yourEth={yourEth}
          yourExitButton={yourExitButton}
          yourEnterButton={yourEnterButton}
          xfLobbyExit={this.exitDay}
          xfLobbyEnter={this.enterDay}
          xfLobbyMembers={xfLobbyMembers}/>
          </Route>
          <Route path="/" exact>
            <div>
            <h1>Welcome to Decentralife Prototype v1.0</h1>

            </div>
          </Route>
          <Route path="/transfer" exact>
          </Route>
        </Switch>
        </Router>

      </div>
    );
  }
}

export default App;
