import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import {  xfExitWithAccount} from "../Querys/Queries";
import Web3 from 'web3'
import Table from 'react-bootstrap/Table';
import moment from 'moment';
moment().format();

export const GetXfExits = (props) => {
  console.log(props)
  const { error, loading, data } = useQuery(xfExitWithAccount(props.account));

  let i = 0;
  let array = []
  var d = new Date(0)

 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let array = data.xfLobbyExits.map((data) => (
    <tr key={data.id}>
    <td>{  moment.unix(data.timestamp).format('dddd, MMMM Do, YYYY h:mm:ss A')}</td>
    <td>{data.xfAmount / 1000000000}</td>
    <td>{data.id}</td>
</tr>
  
))
  return(
    <>
    <div>
      <Table striped bordered variant="dark">
          <thead>
            <tr>
              <td>
                Date and Time of Tranform Lobby Exit Transaction.
              </td>
              <td>
                Transform Amount Total (HEX)
              </td>
              <td>
                ID
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

export default GetXfExits;
