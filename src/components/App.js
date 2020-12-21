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
      console.log(currentDay)
      let totalEth = 0

  function myTotalHex() {
       var newArray = []
       var amount = ""
      for (var i = 351; i >= 1; --i)
      {
      if(i >= 19)
      {
      amount = 500000000
      newArray.push (amount)
      }
      if(i <= 19 && i >= 2)
      {

      amount = 525000000
      newArray.push (amount)
      }
      if(i >= 20 && i <= 351)
      {
      amount = 1500000000
      newArray.push (amount)
      }
  }
  return newArray;   // The function returns the product of p1 and p2
}
i = 351
      totalEth = await tokenFarm.methods.xfLobby(currentDay).call()

      let totalEthByDay = []
      let hexAvailableArray = myTotalHex();
      let hexToEthDisplay = 0
      let hexToEth = hexAvailableArray[currentReversed]

      while (i >= 1)
      {
        totalEthByDay[i] = await tokenFarm.methods.xfLobby(i).call()
        if(totalEth > 0){
        hexToEth = hexAvailableArray[351 - i] * Web3.utils.fromWei(totalEth, "Ether")
      }
        i--
      }
       hexToEth = hexToEth
    // Load TokenFarm


      let totalSupply_ = await tokenFarm.methods.totalSupply().call()
      let day = await tokenFarm.methods.currentDay().call()
      let yourAddress_ = await tokenFarm.methods.currentDay().call()
      let initSuppl_ = await tokenFarm.methods.initSupply().call()
      this.setState({ totalEthXL:  totalEth.toString()})
      this.setState({ hexToEth:  hexToEth.toString()})
      this.setState({ currentDay:  day.toString()})
      this.setState({ yourAddress:  yourAddress_.toString()})
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

  exitDay = (day) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.xfLobbyExit(day , '0').send({ from: this.state.account }).on('transactionHash', (hash) => {
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
      totalSupply: '0',
      initSupply: '0',
      loading: true
    }
  }

  render() {
    const { account, dappToken, currentDay, tokenFarm, totalEthXL, hexToEth, totalSupply, initSupply, loading} = this.state;
    let initSupply_ = Web3.utils.fromWei(initSupply, "Gwei")
    let totalSupply_ = Web3.utils.fromWei(totalSupply, "Gwei")
    let currentDay_ = currentDay
    let account_ = account

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
