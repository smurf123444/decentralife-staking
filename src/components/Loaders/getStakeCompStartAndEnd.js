import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import { xfEnterAndExitWithAccount, xfExitWithAccount, stakeStartAndEndWithAccount} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Web3 from 'web3'
import '../TransformLobby/styles.css';  
import Popup from '../TransformLobby/PopupXf';
import moment from 'moment';
moment().format();
export const GetStakeCompStartAndEnd = (props) => {
  const { error, loading, data } = useQuery(stakeStartAndEndWithAccount(props.account));
  let ass = []
  let tits = []
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let i = 0;
  data.stakeStarts.map((data) => {
    tits[i] = [data.id, data.stakeId, data.stakedDays, data.stakeTShares, data.startDay,data.endDay, (data.stakedHearts / 100000000)]
   i++
   })
   i = 0;
   data.stakeEnds.map((data) => {
     ass[i] = [data.id,data.stakeId , (data.stakedHearts   / 100000000), (data.payout   / 100000000), (data.penalty / 100000000 ), (data.payout / 100000000)- (data.penalty  / 100000000), data.daysLate, data.servedDays, data.stakedShares, data.prevUnlocked ]
   i++
  })
 }
 let i = 0
 let vag = []
 let a, b;
 console.log(tits)
 console.log(ass)

 function checkIfArrayIncludes(arr1, arr2) {
  console.log(arr1)
  console.log(arr2)
  return arr2 === arr1;
}

 t = 0
 while (i < tits.length) {
     //ßass[t].some(r=> tits[i].includes(r) >= 0)
     let found = checkIfArrayIncludes(tits, ass)
    console.log(found)
    if(!found){
        vag.push(tits[i])
      console.log(tits[i])
    }
    t++
    i++
   }
   
console.log(vag)
i = 0
let t = 0
 while (i < vag.length) {
   while(t < vag.length){
   console.log(vag[i][1] === tits[i][1])
    if(vag[i][1] === tits[t][1]){
      vag[i] = []
    }
    t++
  }
  t = 0
  i++
}
i = 0
let array = []
let s = 0
while (i < vag.length)
{
if(vag[i] === 0)
{
  i++
}
else
{
  /*

    id
      timestamp
      memberAddr
      data0
      rawAmount
      enterDay
      */
  array[i] = (
    <>
    <tr key={data.id}>
      <td>{s}</td>
   <td>{/*stakeId*/tits[i][1]}</td>

   <td> {/*stakedDays*/tits[i][2]}</td>

   <td>{/*stakeTShares*/tits[i][3] }</td>

   <td>{/*staked Days*/tits[i][4] }</td>

   <td> {/*startDay*/tits[i][5] }</td>
   <td> { props.func(s++, tits[i][1]) }</td>
    </tr>
    </>
   )
   i++
}
}
s=0
 return(
  <>
  <div>
    <Table striped bordered hover size="dark">
        <thead>
          <tr>
            <td>Index of Stake</td>
            <td>
            stakeId
            </td>
            <td>
            stakedDays
            </td>
            <td>
            T-Shares
            </td>
            <td>
              Days Staked
            </td>
            <td>
              Exit Available on Day:
            </td>
          </tr>
        </thead>
        {array}


      </Table>
  </div>
</>
)
}

export default GetStakeCompStartAndEnd;
