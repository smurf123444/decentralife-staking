import React, { Component } from 'react'
import Web3 from 'web3'
import Button from 'react-bootstrap/Button';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import TokenFarm from '../assets/TokenFarm.json'
import CanvasJSReact from '../assets/canvasjs.react';
import Main from './Main'
import TransformList from './TransformLobby/TransformList'
import './App.css'
import Logo from '../dai.png'


var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class App extends Component {
  

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const tokenFarm = new web3.eth.Contract(TokenFarm, '0x075e4F66C4D53DD2d37b91BD7382b34F3B681B4f')
    this.setState({ tokenFarm })
      let i = 351
      let currentDay = await tokenFarm.methods.currentDay().call()
      let currentReversed = 351 - currentDay
      let totalEth = 0

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
      totalEth = await tokenFarm.methods.xfLobby(currentDay).call()

      //variable for totalEthByDay to make array with date and value of that day.
      let totalEthByDay = []
      let checkEthByDay = []
      //total hex for all days available (hardcoded)
      let hexAvailableArray = myTotalHex();
      //variable to convert Eth by day times amount available for whats left to transform on that day.
      let hexToEthDisplay = 0
      //Used to store today's value that has value stored (kinda simplistic)
      let hexToEth = []
      let yourHex = []
      let yourEth = []
      let tempValue = 0

//Check each day for for total Eth spent on that day.
      while (i >= 1)
      {
        //add items to array that include that day as the ID and transferValue for value.
        totalEthByDay[i] = await tokenFarm.methods.xfLobby(i).call()
        //if the total Eth variable is 0, then display the amount of ether on that specific day.
        if(totalEth > 0 || totalEthByDay[i] > 0){
          //equation to change amount of hex available for the day and personal.
         
          tempValue = parseInt(hexAvailableArray[351 - i]) * totalEthByDay[i]
        hexToEth[i] = hexAvailableArray[351 - i] - (parseInt(hexAvailableArray[351 - i]) * Web3.utils.fromWei(totalEthByDay[i], "Ether"))
        yourHex[i] = (parseInt(hexAvailableArray[351 - i]) * Web3.utils.fromWei(totalEthByDay[i], "Ether"))
        yourEth[i] = Web3.utils.fromWei(totalEthByDay[i], "Ether")
       // hexToEth = hexAvailableArray[351 - i] * Web3.utils.fromWei(totalEthByDay, "Ether")
        checkEthByDay[351 - i + 1] = true
      
      }
      else
      {
        hexToEth[i] = hexAvailableArray[351 - i] * 1
        yourHex[i] = 0
        yourEth[i] = 0
        checkEthByDay[351 - i + 1] = false
      }
        i--
      }



 // Load State Variables.
      let totalSupply_ = await tokenFarm.methods.totalSupply().call()
      let day = await tokenFarm.methods.currentDay().call()
      let yourAddress_ = accounts[0]
      let initSuppl_ = await tokenFarm.methods.initSupply().call()
      this.setState({ totalEthXL:  totalEth.toString()})
      this.setState({ hexToEth:  hexToEth[currentDay].toString()})
      this.setState({ currentDay:  day.toString()})
      this.setState({ yourAddress:  yourAddress_.toString()})
      this.setState({ yourHex:  yourHex[currentDay].toString()})
      this.setState({ yourEth:  yourEth[currentDay].toString()})
      this.setState({ yourButton:  checkEthByDay})
     
      this.setState({ totalSupply: totalSupply_.toString()})
      this.setState({ initSupply: initSuppl_.toString() })
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

  changeFirst = (newValue) => {
    this.setState({
      yourButtonDay: newValue,
    })
  }


  stakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.approve(this.state.tokenFarm._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.tokenFarm.methods.stakeTokens(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTokens = (amount) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.unstakeTokens().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }
//!!!!!!
  exitDay = (day) => {
    let s = 351 - day + 1;
    console.log('Came to ExitDay Function and DAY is ', s - this.state.currentDay);
    this.setState({ loading: true })
    console.log(s - this.state.currentDay)
    this.state.tokenFarm.methods.xfLobbyExit(s - this.state.currentDay, '0').send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      dappToken: {},
      currentDay: '0',
      tokenFarm: {},
      totalEthXL: '0',
      hexToEth: '0',
      yourHex:'0',
      yourEth: '0',
      changeFirst: '0',
      yourButton: '0',
      yourButtonDay: '0',
      totalSupply: '0',
      initSupply: '0',
      loading: true
    };
    this.exitDay = this.exitDay.bind(this);
  }

  render() {
    const { account, dappToken, currentDay, changeFirst, totalEthXL, hexToEth, yourHex, yourEth, yourButton, totalSupply, initSupply, loading} = this.state;
    let initSupply_ = Web3.utils.fromWei(initSupply, "Gwei")
    let totalSupply_ = Web3.utils.fromWei(totalSupply, "Gwei")
  

    let burned =  initSupply_ - totalSupply_ 

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
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        dappTokenBalance={this.state.dappTokenBalance}
        
        totalSupply={this.state.totalSupply}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />
    }

    return (
      <div>
                      <Router>
        <div>
    <nav>
      <h3>
      <img src={Logo} />
      </h3>
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
          <TransformList 
          day={currentDay}
          ethTransformed={this.props.ethTransformed} 
          totalEth={Web3.utils.fromWei(totalEthXL, "ether")} 
          hexToEth={hexToEth} 
          closing={currentDay}
          yourAddress={account}
          yourHex={yourHex}
          yourEth={yourEth}
          yourButton={yourButton}
          xfLobbyExit={this.exitDay}/>
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
