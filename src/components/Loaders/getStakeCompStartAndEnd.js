import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import {  stakeStartWithAccount, stakeEndWithAccount, stakeStartAndEndWithAccount } from "../Querys/Queries";
import Web3 from 'web3'
import Table from 'react-bootstrap/Table';
import moment from 'moment';
moment().format();


class StakeStartClass {
  id;
  stakeId;
  stakedDays;
  stakeTShares;
  startDay;
  endDay;
  stakedHearts;
}
class StakeEndClass {
  id;
  stakedHearts;
  payout;     
  penalty;     
  payout;      
  daysLate; 
  servedDays;
  stakedShares;
  prevUnlocked;
}
class StakeArray {
array1;
array2;
}
  export const GetStakeCompStartAndEnd = (props) => {
    console.log(props)
    const { error, loading, data } = useQuery(stakeStartAndEndWithAccount(props));
    let ass = []
    let tits = []
   if(loading){
     return(<div>Loading...</div>)
   }
   else{
    let i = 0;

/*
  let stakeStarts = array.stakeStarts.map((data) => (
  <tr key={data.id}>
  <td>{i++}</td>
  <td> {data.stakeId}</td>
  <td>{data.stakedDays}</td>
  <td> {data.stakeTShares}</td>
  <td> {data.startDay}</td>
  <td>{data.endDay}</td>
  <td> {data.stakedHearts / 1000000000}</td>
  </tr>))

let stakeEnd = array.stakeEnds.map((data) => (
  <tr key={data.id}>
  <td>{data.stakedHearts / 1000000000}  </td>
  <td>{data.payout / 1000000000}  </td>
  <td>{data.penalty  / 1000000000   }  </td>
  <td>{(data.payout / 1000000000)- (data.penalty  / 1000000000)   }  </td>
  <td>{data.daysLate    }  </td>
  <td>{data.servedDays  }  </td>
  <td>{data.stakedShares/1000000000000}  </td>
  <td>{data.prevUnlocked}  </td>
</tr>))
*/
let array = new StakeArray()

    data.stakeStarts.map((data) => {
    tits = new StakeStartClass
    /*  tits[i] = [data.id, data.stakeId, data.stakedDays, data.stakeTShares, data.startDay,data.endDay, (data.stakedHearts / 1000000000)]*/
    tits.id = data.id
    tits.stakeId = data.stakeId
    tits.stakedDays = data.stakedDays
    tits.stakeTShares = data.stakeTShares
    tits.startDay = data.startDay
    tits.endDay = data.endDay
    tits.stakedHearts = (data.stakedHearts / 1000000000)
    array.array1[i] = tits

    })
    i = 0;
    data.stakeEnds.map((data) => {
      ass[i] = [data.id, (data.stakedHearts   / 1000000000), (data.payout   / 1000000000), (data.penalty / 1000000000 ), (data.payout / 1000000000)- (data.penalty  / 1000000000), data.daysLate, data.servedDays, data.stakedShares, data.prevUnlocked ]
    //moment.unix(data.timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A')
    i++
    })
   }
   
   let vag = []
   vag[0] = tits
   vag[1] = ass
   console.log(vag)
   return(vag)
  }

export default GetStakeCompStartAndEnd;
