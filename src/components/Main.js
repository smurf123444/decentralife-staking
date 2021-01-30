import React, { Component } from 'react'
import dai from '../dai.png'
import './TransformLobby/styles.css';  
class Main extends Component {
  render() {

    /*        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td></td>
              <td scope="col">{this.props.dappTokenBalance}</td>
            </tr>
          </tbody>


{console.log(this.props.account)}
        
          </table>*/



    return (
      <div id="content" className="mt-3">



        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                let day
                amount = this.input.value.toString()
                amount = window.web3.utils.toWei(amount, 'Szabo')
                day = this.day.value.toString()
                this.props.stakeTokens(amount, day)
              }}>
              <div>
                <label className="float-left"><b>Stake TIT Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(this.props.dappTokenBalance, 'Ether')}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                    
                    <img src={dai} height='32' alt=""/>
                    &nbsp;&nbsp;&nbsp; Token
                  </div>
                </div>
              </div>
              <div className="input-group-append">
                  <div className="input-group-text">
              <label className="float-left"><b>Days</b>&nbsp;</label>
              <input
                  type="text"
                  ref={(input) => { this.day = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
           
              </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">STAKE!</button>
            </form>
            <form onSubmit={(event) => {
                event.preventDefault()
                let tits
                let tits2
                tits = this.tits.value.toString()
                tits2 = this.tits2.value.toString()
                this.props.unstakeTokens(tits, tits2)
              }}>
                <label className="float-centerHead"><b>⚠️Warning⚠️ </b></label>
                <br/>
                <label className="float-centerLine"><b>Unstaking early imposes a penalty!</b></label>
                <br />
              
                <label className="float-centerLine"><b> Be sure its <bold class="red">DUE</bold> for Exit...</b></label>
                <label className="float-left"><b>"Index of Stake" within <span>&nbsp;&nbsp;</span>⬆️ <span>&nbsp;&nbsp;</span> StakeList <span>&nbsp;&nbsp;</span>⬆️ <span>&nbsp;&nbsp;<b>{"\n"}(Located Above)</b></span></b></label>
            <input
                  type="text"
                  ref={(input) => { this.tits = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                  <label className="float-left"><b>"Stake ID" within <span>&nbsp;&nbsp;</span>⬆️ <span>&nbsp;&nbsp;</span> StakeList <span>&nbsp;&nbsp;</span>⬆️ <span>&nbsp;&nbsp;<b>{"\n"}(Located Above)</b></span></b></label>
                    <input
                  type="text"
                  ref={(input) => { this.tits2 = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                              <button
              type="submit"
              className="btn btn-primary btn-block btn-lg">
                UN-STAKE...
              </button>
            </form>

          </div>
        </div>
        <div>
          
        </div>

      </div>
    );
  }
}

export default Main;
