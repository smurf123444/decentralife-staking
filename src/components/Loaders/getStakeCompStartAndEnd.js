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
  let uniqueStake=[]
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
  console.log('stakeeee',data)
   uniqueStake = data.stakeStarts.filter(({ id }) =>
  !data.stakeEnds.some(exclude => exclude.id === id)
);
 }

let s = 0

s=0
 return(
  <>
  <div>
    <Table striped bordered hover size="dark">
        <thead>
          <tr>
<td>
  Amount of DEF Staked: 
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
        <tbody>
        {uniqueStake.map(data=>(
          <tr key={data.id}>
            <td>{data.stakedHearts / 1000000}</td>
    
       <td>{data.stakedDays}</td>
    
       <td>{data.stakeTShares * 1000000}</td>
    
       <td>{data.stakedDays}</td>
    
       <td>{data.endDay}</td>
       <td> { props.func(s++, data.stakeId) }</td>
        </tr>
          
        ))}
</tbody>
      </Table>
  </div>
</>
)
}

export default GetStakeCompStartAndEnd;
