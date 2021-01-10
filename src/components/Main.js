import React, { Component } from 'react'
import dai from '../dai.png'

class Main extends Component {
  render() {

    



    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
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



        
          </table>

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
            <button
              type="submit"
              className="btn btn-link btn-block btn-sm"
              onClick={(event) => {
                event.preventDefault()
                this.props.unstakeTokens()
              }}>
                UN-STAKE...
              </button>
          </div>
        </div>
        <div>
          
        </div>

      </div>
    );
  }
}

export default Main;
