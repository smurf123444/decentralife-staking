import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import {  stakeEndWithAccount } from "../Querys/Queries";
import Web3 from 'web3'
import Table from 'react-bootstrap/Table';
import moment from 'moment';
moment().format();
var BigNumber = require('big-number');

export const GetStakeEnd = (props) => {
  const { error, loading, data } = useQuery(stakeEndWithAccount(props.account));
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let array = data.stakeEnds.map((data) => (
    <tr key={data.id}>
      <td>{data.stakeId}</td>
    <td>{BigNumber(data.stakedHearts).div(100000000).toString()}  </td>
    <td>{data.payout  / 100000000}  </td>
    <td>{data.penalty / 100000000}  </td>
    <td>{BigNumber((data.payout)- (data.penalty)).div(100000000).toString() }  </td>
    <td>{data.daysLate    }  </td>
    <td>{data.servedDays  }  </td>
    <td>{data.stakedShares/ 10}  </td>
    <td>{data.prevUnlocked}  </td>
</tr>
))
  return(
    <>
    <div>
      <Table striped bordered hover size="dark">
          <thead>
            <tr>
              <td>Stake ID</td>
              <td>
              Staked DEF
              </td>
              <td>
              Gross payout
              </td>
              <td>
              penalty
              </td>
              <td>
                Net Payout
              </td>
              <td>
              daysLate
              </td>
              <td>
              servedDays
              </td>
              <td>
              stakedShares
              </td>
              <td>
              prevUnlocked
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

export default GetStakeEnd;
