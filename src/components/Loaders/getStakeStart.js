import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import {  stakeStartWithAccount } from "../Querys/Queries";
import Web3 from 'web3'
import Table from 'react-bootstrap/Table';
import moment from 'moment';
moment().format();

export const GetStakeStart = (props) => {
  console.log(props)
  const { error, loading, data } = useQuery(stakeStartWithAccount(props.account));

  let i = 0;
  let array = []
  var d = new Date(0)

 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let array = data.stakeStarts.map((data) => (
    <tr key={data.id}>
    <td>{i++}</td>
   <td> {data.stakeId}</td>
   <td>{data.stakedDays}</td>
   <td> {data.stakeTShares}</td>
   <td> {data.startDay}</td>
   <td>{data.endDay}</td>
   <td> {data.stakedHearts / 1000000000}</td>
</tr>
  //moment.unix(data.timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A')
))
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
}

export default GetStakeStart;
