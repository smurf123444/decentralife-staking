import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import {  stakeStartWithAccount, stakeEndWithAccount } from "../Querys/Queries";
import Web3 from 'web3'
import Table from 'react-bootstrap/Table';
import moment from 'moment';
moment().format();
let array2 = []
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
export const GetStakeCompEnd = (props) => {
  console.log(props)
  const { error, loading, data } = useQuery(stakeEndWithAccount(props));
  let tits = new StakeEndClass()
  let array = []
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let i = 0;
  data.stakeEnds.map((data) => {
   tits = new StakeEndClass()
   tits.id =  data.id
   tits.stakedHearts =  data.stakedHearts   / 1000000000
   tits.payout =  data.payout         / 1000000000
   tits.penalty =  data.penalty        / 1000000000 
   tits.payout = (data.payout        / 1000000000)- (data.penalty  / 1000000000)
   tits.daysLate =  data.daysLate 
   tits.servedDays =  data.servedDays 
   tits.stakedShares = data.stakedShares   /1000000000000
   tits.prevUnlocked = data.prevUnlocked
   array[i] = tits
   i++
  //moment.unix(data.timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A')
  })
 }
}
export default GetStakeCompEnd;
