import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import {  stakeStartWithAccount, stakeEndWithAccount, stakeStartAndEndWithAccount } from "../Querys/Queries";
import Web3 from 'web3'
import Table from 'react-bootstrap/Table';
import moment from 'moment';
moment().format();



class StakeArray {
  array1 = []
  array2 = []
}
  export const GetStakeCompStartAndEnd = (props) => {
    console.log(props)
    const { error, loading, data } = useQuery(stakeStartAndEndWithAccount(props.account));
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
let array = []

    data.stakeStarts.map((data) => {
    
   
     tits[i] = [data.id, data.stakeId, data.stakedDays, data.stakeTShares, data.startDay,data.endDay, (data.stakedHearts / 1000000000)]
   /* tits = new StakeStartClass()
    tits.id = data.id
    tits.stakeId = data.stakeId
    tits.stakedDays = data.stakedDays
    tits.stakeTShares = data.stakeTShares
    tits.startDay = data.startDay
    tits.endDay = data.endDay
    tits.stakedHearts = (data.stakedHearts / 1000000000)
    array[i] = tits*/
    i++
    })
    i = 0;
    data.stakeEnds.map((data) => {
      ass[i] = [data.id,data.stakeId , (data.stakedHearts   / 1000000000), (data.payout   / 1000000000), (data.penalty / 1000000000 ), (data.payout / 1000000000)- (data.penalty  / 1000000000), data.daysLate, data.servedDays, data.stakedShares, data.prevUnlocked ]
    //moment.unix(data.timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A')
    i++
    })
   }
   let i = 0

   let vag = []
   
   while (i < tits.length) {
    while (i < ass.length) {

      if(tits[i][0].indexOf("0x") >= 0 && ass[i][0].indexOf("0x") >= 0){
        if(tits[i][1] === ass[i][1]){
          console.log("StakeID " + tits[i][1] + " MATCHED")
          vag.push(tits[i])
        }
        i++
      }
     }
      i++
      console.log("searching...")
}

i = 0
   while (i < vag.length) {
      if(vag[i][1] === tits[i][1]){
        console.log(vag[i][1] === tits[i][1])
        tits[i] = 0
      }

      i++
     }
i = 0
let array = []
let s = 0
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

     <td> {s++}</td>

     <td>{/*stakedID*/tits[i][1]}</td>

     <td> {/*stakedDays*/tits[i][2]}</td>

     <td> {/*stakeTShares*/tits[i][3] }</td>

     <td>{/*startDay*/tits[i][4] }</td>

     <td> {/*endDay*/tits[i][5] }</td>

     <td> {/*stakedHearts*/tits[i][6] }</td>
      </tr>
      </>
     )
     i++
  }
}
/*
   while (i < tits.length) {

   if(tits[i][0].indexOf("0x") >= 0)
   {
    console.log("StakeStarts located")
    //id
    console.log(tits[i][0])
    //stakeID
    console.log(tits[i][1])
    //stakedDays
    console.log(tits[i][2])
    //stakeTShares
    console.log(tits[i][3])
    //startDay
    console.log(tits[i][4])
    //endDay
    console.log(tits[i][5])
    //stakedHearts
    console.log(tits[i][6])
   }

   i++
  }
  
  i = 0
  while (i < ass.length) {
    console.log(ass[i][0])
    if(ass[i][0].indexOf("0x") >= 0)
    {
     console.log("StakeEnds located")
     //id
     console.log(ass[i][0])
     // stakeID
     console.log(ass[i][1])
     // stakedHearts
     console.log(ass[i][2])
     // gross payout
     console.log(ass[i][3])
     // penalty
     console.log(ass[i][4])
     // net startDay
     console.log(ass[i][5])
     // daysLate
     console.log(ass[i][6])
     // servedDays
     console.log(ass[i][7])
     // stakedShares
     console.log(ass[i][8])
     //prevUnlocked
     console.log(ass[i][9])
    }
    i++
   }

*/


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

export default GetStakeCompStartAndEnd;
