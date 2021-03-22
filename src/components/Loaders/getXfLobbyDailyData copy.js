import React, {} from "react";
import { useQuery, gql } from "@apollo/client";
import {xfLobbyDailyData} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import '../TransformLobby/styles.css';  
import moment from 'moment';
moment().format();
var BigNumber = require('big-number');
let tits = []
let i = 0
export const GetExitButton = (props) => {
  web3;

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      tokenFarm: '',
      account:''
    };

    this.handleChange = this.handleChange.bind(this);
    const web3 = window.web3
    const tokenFarm = new web3.eth.Contract(TokenFarm, '0x752A2B1C0Da8E07da1a78c512A576106b57DCc23')
    this.setState({ tokenFarm })
  }
  
enterDay = (value) =>{
    this.state.tokenFarm.methods.xfLobbyEnter(this.props.account).send({ from: this.props.account, value: value})
  
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  const { error, loading, data } = useQuery(xfLobbyDailyData());


 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  
  
  data.dailyDataUpdates.map((data) => {
    tits[i] = [data.beginDay, data.payoutPerTShare, data.endDay, data.lobbyEth, data.lobbyHexPerEth,data.lobbyHexAvailable, data.shares, data.payout]
   i++
   })
 }

let s = 0
let item1 = []
function strip20(number) {
  return (parseFloat(number).toPrecision(20));
}
function strip12(number) {
return (parseFloat(number).toPrecision(12));
}
let string = (tits[0][0]).toString()
i = 0
let array = []
while (i < tits.length)
{
  array[i] = (
    <>
    <tr key={data.id}>

   <td> {/*beginDay*/tits[i][0]}</td>

   <td>{/*payoutPerTShare*/tits[i][1] }</td>

   <td> {/*lobbyEth*/tits[i][3] }</td>
   <td> {/*lobbyHexPerEth*/parseInt(tits[i][4]) }</td>
   <td> {/*lobbyHexAvailable*/BigNumber(parseInt(tits[i][5])).div(10000000).toString() }</td>
   <td> {/*shares*/tits[i][6] }</td>
   <td> {/*payout*/BigNumber(parseInt(tits[i][7])).div(10000000).toString() }</td>

    </tr>
    </>
   )
i++

}
 console.log(tits.length)
s=0
 return(
<div className='popup'>  
<div className='popup_open'>  
<button onClick={this.props.closePopup}>X</button>  

<center><h1 class="h1_popup">⚠️ Warning ⚠️</h1>  </center>

<center><h4 class="h1_popup">-</h4>  </center>
<center><h4 class="h1_popup">Ending a Stake EARLY or LATE can cause a penalty (up to 100%)</h4>  </center>

<center><h4 class="h1_popup">-</h4>  </center>
<center><h4 class="h1_popup">Make Absolutely SURE that your stake is DUE today!</h4>  </center>

<center><h4 class="h1_popup">-</h4>  </center>
<center><h4 class="h1_popup">WE DO NOT ISSUE REFUNDS AND CANNOT ROLLBACK TRANSACTIONS ON ETHEREUM</h4>  </center>
<center><h4 class="h1_popup">-</h4>  </center>
<center><h4 class="h1_popup">Click "Submit" if you confirm or EXIT this popup...</h4>  </center>

<form className="form-button-height" id={s} onSubmit={(event) => {
                               
                               event.preventDefault()
                                console.log(s)
                               this.props.func(parseInt(event.target.getAttribute("id")));
   
                               }}>
                   <button type="submit" className="btn btn-primary btn-block btn-lg">Submit</button>

</form>

</div>  
</div>  
)
}

export default GetDailyData;
