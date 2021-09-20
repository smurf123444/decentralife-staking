import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import {  stakeEndWithAccount } from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import moment from 'moment';
var bigDecimal = require('js-big-decimal');
moment().format();
function strip4(number) {
  return (parseFloat(number).toPrecision(4));
}
export const GetStakeEnd = (props) => {
  const { error, loading, data } = useQuery(stakeEndWithAccount(props.account));
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let array = data.stakeEnds.map((data) => (
    <tr key={data.id}>
      <td>{data.stakeId}</td>
    <td>{bigDecimal.divide(data.stakedHearts.toString(), '100000000', 4)}  </td>
    <td>{ bigDecimal.divide(data.payout .toString(), '100000000', 4)}  </td>
    <td>{bigDecimal.divide((data.penalty ).toString(), '100000000', 4) }  </td>
    <td>{ bigDecimal.divide((data.payout-data.penalty).toString(), '100000000', 4)}  </td>
    <td>{data.daysLate    }  </td>
    <td>{data.servedDays  }  </td>
    <td>{bigDecimal.divide(data.stakedShares.toString(), '1000000000000', 10)}  </td>
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
              Penalty
              </td>
              <td>
              Net Payout
              </td>
              <td>
              Days Late
              </td>
              <td>
              Served Days
              </td>
              <td>
              Staked Shares
              </td>
              <td>
              Good Accounting activated?
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
