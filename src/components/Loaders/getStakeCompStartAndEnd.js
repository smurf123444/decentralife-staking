import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import { stakeStartAndEndWithAccount } from "../Querys/Queries";
import Web3 from 'web3'
import Table from 'react-bootstrap/Table';
import PopupStakeEnd from './PopupStakeEnd';
import moment from 'moment';
moment().format();


  export const GetStakeCompStartAndEnd = (props) => {
    //console.log(props)
    const { error, loading, data } = useQuery(stakeStartAndEndWithAccount(props.account));
    let ass = []
    let tits = []
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
   }
   let i = 0
   let vag = []
   if (ass.length < tits.length)
   {
      while (i < tits.length - 1)
      {
        //console.log(tits)
        //console.log(ass)
        ass.push([])
        i++
      }
   }
   if (ass.length > tits.length)
   {
      while (i < ass.length - 1)
      {
       // console.log(tits)
       // console.log(ass)
        tits.push([])
        i++
      }
   }

i = 0
let t = 0
  while (i < ass.length) {
   // console.log(tits[i])
  //  console.log(ass[0].includes(tits))
  //console.log(ass[t].includes(tits[i][0]))
  const found = ass.some(r=> tits.indexOf(r) >= 0)
  console.log(found)
    if(tits[2].includes(ass[i][1])){
      console.log(tits[i][1])
        vag.push(tits[i])
        console.log("Fire")
      i++
    }
    if(tits[0].includes(ass[i][1])){
      console.log(tits[i][1])
        vag.push(tits[i])
        console.log("Fire")
      i++
    }
    else {
      vag.push([])
      i++
    }
  }
i = 0
   while (i < tits.length) {
   //console.log(vag[i][1] === tits[i][1])
      if(vag[i][1] === tits[i][1]){      
        tits[i] = 0
      }
      i++
     }
i = 0
let array = []
let s = 0
//console.log(vag)
if (tits.length > ass.length)
{
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
  
       <td> {/*stakedDays*/tits[i][2]}</td>
  
       <td> {/*stakeTShares*/tits[i][3] }</td>
  
       <td>{/*startDay*/tits[i][4] }</td>
  
       <td> {/*endDay*/tits[i][5] }</td>
  
       <td> {/*stakedHearts*/tits[i][6] }</td>
       {console.log(s, tits[i][1])}
       <td> { props.func(s++, tits[i][1]) }</td>
        </tr>
        </>
       )
       i++
    }
  }
}
else{
  while (i < ass.length)
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

     <td> {/*stakedDays*/tits[i][2]}</td>

     <td> {/*stakeTShares*/tits[i][3] }</td>

     <td>{/*startDay*/tits[i][4] }</td>

     <td> {/*endDay*/tits[i][5] }</td>

     <td> {/*stakedHearts*/tits[i][6] }</td>
     
     <td> { props.func(s++, tits[i][1]) }</td>
      </tr>
      </>
     )
     i++
  }
}
}

   return(
    <>
    <div>
      <Table striped bordered hover size="dark">
          <thead>
            <tr>

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
                Staked DTE
              </td>
              <td>
                Exit Stake (Button)
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
