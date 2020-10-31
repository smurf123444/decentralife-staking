import React, { Component } from 'react'
import Web3 from 'web3'
import TokenFarm from '../abis/TokenFarm.json'
import CanvasJSReact from '../assets/canvasjs.react';
import Navbar from './Navbar'
import Main from './Main'
import './App.css'
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




    // Load TokenFarm

    let tokenFarmData = true
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, '0x21Daa6e96469da830c7F99AFa3889FA9db209816')
      this.setState({ tokenFarm })
      let stakingBalance = await tokenFarm.methods.stakingBalance(this.state.account).call()
      let total_Balance = await tokenFarm.methods.balanceOf(this.state.account).call()
      let totalSupply_ = await tokenFarm.methods.totalSupply().call()
      let initSuppl_ = await tokenFarm.methods.initSupply().call()
      this.setState({ stakingBalance: stakingBalance.toString() })
      this.setState({ dappTokenBalance:  total_Balance.toString()})
      this.setState({ totalSupply: totalSupply_.toString()})
      this.setState({ initSupply: initSuppl_.toString() })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

    this.setState({ loading: false })
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

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      dappToken: {},
      tokenFarm: {},
      stakingBalance: '0',
      totalSupply: '0',
      initSupply: '0',
      loading: true
    }
  }

  render() {
    const { account, dappToken, tokenFarm, stakingBalance, totalSupply, initSupply, loading} = this.state;
    let initSupply_ = Web3.utils.fromWei(initSupply, "Ether")
    let totalSupply_ = Web3.utils.fromWei(totalSupply, "ether")
    let stakingBalance_ = Web3.utils.fromWei(stakingBalance, "Ether")
    let burned =  initSupply_ - totalSupply_  - stakingBalance_

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
          { y: stakingBalance_, label: "Amount Staked" },
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
        stakingBalance={this.state.stakingBalance}
        totalSupply={this.state.totalSupply}
        stakeTokens={this.stakeTokens}
        unstakeTokens={this.unstakeTokens}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
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
      </div>
    );
  }
}

export default App;
