import React, { Component } from 'react'
import dai from '../dai.png'
import './TransformLobby/styles.css';  
class Main extends Component {
  render() {

    return (
      <div id="content" className="mt-3">



        <div className="card mb-4" >

          <div className="card-body" style={{border:'inset', backgroundColor: '#3a3a3a', color: 'metalic'}}>

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                let day
                amount = this.input.value.toString()
                amount = amount * 1000000
                day = this.day.value.toString()
                this.props.stakeTokens(amount, day)
              }}>
              <div>
                <label className="float-left"><b>Stake DEF Tokens</b></label>
                <span className="float-right text-muted">
                  Balance: {this.props.dappTokenBalance}
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
                    
                    DEF
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
              <button type="submit" className="btn btn-secondary btn-block btn-lg">STAKE!</button>
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
