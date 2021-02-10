import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import { xfEnterAndExitWithAccount, xfExitWithAccount} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Web3 from 'web3'
import '../TransformLobby/styles.css';  
import Popup from '../TransformLobby/PopupXf';
import moment from 'moment';
moment().format();
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

   <td>{/*timestamp*/
   moment(tits[i][1] * 1000).format('L')}</td>

   <td> {/*memberaddr*/tits[i][2]}</td>

   <td>{/*rawAmount*/tits[i][4] }</td>

   <td> {/*enterDay*/tits[i][5] }</td>

    </tr>
    </>
   )
   i++
}
}
 return(
  <>
  <div>
    <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <td>
            Date Entered
            </td>
            <td>
            memberAddr
            </td>
            <td>
             rawAmount
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

export default GetXfCompEntersAndExit;
