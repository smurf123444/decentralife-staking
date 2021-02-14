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
export const GetDailyData = (props) => {
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

   <td>{/*payoutPerTShare*/tits[i][2] }</td>

   <td> {/*endDay*/tits[i][1] }</td>
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
  <Table striped bordered variant="dark">
    <thead>
      <tr>
        <td>
          Day
        </td>
        <td>
          Payout per T-share
        </td>
        <td>
          Total Lobby Ethereum for Day
        </td>
        <td>
          DEF / 1 ETH
        </td>
        <td>
          DEF Available
        </td>
        <td>
          Total Shares
        </td>
        <td>
          Total Payout
        </td>
      </tr>
    </thead>
  <tbody>


{array}

 
</tbody>

</Table>
)
}

export default GetDailyData;
