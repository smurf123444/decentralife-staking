import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import {  stakeStartWithAccount, stakeEndWithAccount } from "../Querys/Queries";
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
  export const GetStakeCompStart = (props) => {
    console.log(props)
    const { error, loading, data } = useQuery(stakeStartWithAccount(props.account));
  
    let tits = new StakeStartClass()
    let array = []
   if(loading){
     return(<div>Loading...</div>)
   }
   else{
    let i = 0;

    data.stakeStarts.map((data) => {
      tits = new StakeStartClass()
      tits.id = data.id
      tits.stakeId = data.stakeId
      tits.stakeDays = data.stakedDays
      tits.stakeTShares = data.stakeTShares
      tits.startDay = data.startDay
      tits.endDay = data.endDay
      tits.stakedHearts = data.stakedHearts / 1000000000
      array[i] = tits
      i++
    //moment.unix(data.timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A')
    })
   }
   console.log(array)
   return(array)
  }

export default GetStakeCompStart;
