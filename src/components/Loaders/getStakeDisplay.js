import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import {GetStakeCompStartAndEnd} from './getStakeCompStartAndEnd'
import Web3 from 'web3'
import Table from 'react-bootstrap/Table';
import moment from 'moment';
moment().format();
let array1 = []
let i = 0
const GetStakeDisplay = (props) => {
  const array = GetStakeCompStartAndEnd(props.account)

  console.log(array.toString())



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
  return(
    <>
    <div>



    </div>



    </>
  )
 }



export default GetStakeDisplay;
