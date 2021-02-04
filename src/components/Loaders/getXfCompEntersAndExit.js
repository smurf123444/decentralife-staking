import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import { xfEnterAndExitWithAccount, xfExitWithAccount} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Web3 from 'web3'
import '../TransformLobby/styles.css';  
import Popup from '../TransformLobby/Popup';

export const GetXfCompEntersAndExit = (props) => {
  const { error, loading, data } = useQuery(xfEnterAndExitWithAccount(props.account));
  let ass = []
  let tits = []
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let i = 0;
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

    if(tits[i][0] === ass[i][0]){
        vag.push(tits[i])
      i++
    }
   }
    i++
}
i = 0
 while (i < vag.length) {
    if(vag[i][1] === tits[i][1]){
      tits[i] = 0
    }

    i++
   }
i = 0
let array = []
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

   <td>{/*stakedID*/tits[i][1]}</td>

   <td> {/*timestamp*/tits[i][2]}</td>

   <td> {/*memberAddr*/tits[i][3] }</td>

   <td>{/*data0*/tits[i][4] }</td>

   <td> {/*rawAmount*/tits[i][5] }</td>

   <td> {/*enterDay*/tits[i][6] }</td>
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
            timestamp
            </td>
            <td>
            memberAddr
            </td>
            <td>
            data0
            </td>
            <td>
             rawAmount
            </td>
            <td>
              enterDay
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
