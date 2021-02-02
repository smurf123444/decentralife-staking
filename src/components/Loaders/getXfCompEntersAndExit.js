import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import { xfEnterAndExitWithAccount, xfExitWithAccount} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Web3 from 'web3'
import '../TransformLobby/styles.css';  
import Popup from '../TransformLobby/Popup';

export const GetXfCompEntersAndExit = (props) => {
//  console.log(props)
  const { error, loading, data } = useQuery(xfEnterAndExitWithAccount(props.account));
  let ass = []
  let tits = []
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let i = 0;
/*
    xfLobbyEnters(where: {memberAddr: "${tits}"}){
      id
      timestamp
      memberAddr
      data0
      rawAmount
      enterDay
    }
    xfLobbyExits(where: {memberAddr: "${tits}"}){
      id
      timestamp
      xfAmount
      memberAddr
      data0
*/
  data.xfLobbyEnters.map((data) => {
   tits[i] = [data.id, data.timestamp, data.memberAddr, data.data0, data.rawAmount,data.enterDay]
  i++
  })
  i = 0;
  data.xfLobbyExits.map((data) => {
    ass[i] = [data.id, data.timestamp , (data.xfAmount   / 1000000000) , data.memberAddr, data.data0]
  i++
  })
 }

 let i = 0

 let vag = []
 
 while (i < tits.length) {
  while (i < ass.length) {
  //  console.log(" " + tits[i][0] + " " + ass[i][0])

 
    if(tits[i][0] === ass[i][0]){
    
      //  console.log("StakeID " + tits[i][1] + " MATCHED")
        vag.push(tits[i])
      
      i++
    }


   }
    i++
    //console.log("searching...")
}

i = 0
 while (i < vag.length) {
    if(vag[i][1] === tits[i][1]){
      //console.log(vag[i][1] === tits[i][1])
      tits[i] = 0
    }

    i++
   }
i = 0
let array = []
let s = 0
while (i < tits.length)
{
if(tits[i] === 0)
{
  i++
}
else
{
  array[i] = (
    <>
    <tr key={data.id}>

   <td> {s++}</td>

   <td>{/*stakedID*/tits[i][1]}</td>

   <td> {/*stakedDays*/tits[i][2]}</td>

   <td> {/*stakeTShares*/tits[i][3] }</td>

   <td>{/*startDay*/tits[i][4] }</td>

   <td> {/*endDay*/tits[i][5] }</td>

   <td> {/*stakedHearts*/tits[i][6] }</td>
    </tr>
    </>
   )
   i++
}
}
 return(
  <>
  <div>
    <Table striped bordered variant="dark">
        <thead>
          <tr>
            <td>
              Index of Stake
            </td>
            <td>
              Stake ID
            </td>
            <td>
              stakedDays
            </td>
            <td>
              stakeTShares
            </td>
            <td>
              startDay
            </td>
            <td>
              End Day
            </td>
            <td>
              Staked HEX
            </td>
          </tr>
        </thead>
        {array}


      </Table>
  </div>
</>
)
}

export default GetXfCompEntersAndExit;

/*

export const GetXfEnters = (props) => {
  console.log(props)

  let i = 0;
  let array = []
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let array = data.xfLobbyEnters.map((data) => (
    <tr key={data.id}>
        <td>{Web3.utils.fromWei(data.rawAmount, "Ether")}</td>
        <td >{data.enterDay}</td>
        <td class="td-width">{data.id}</td>
  </tr>
  
))
  return(
    <>
    <div>
      <Table striped bordered variant="dark">
      <thead>
            <tr>
              <td>
                Ether Amount Deposited.
              </td>
              <td>
                enterDay
              </td>
              <td>
                ID
              </td>
            </tr>
          </thead>
          {array}

        </Table>
    </div>
</>
    )
 }
}

*/