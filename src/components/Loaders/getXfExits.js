import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import {  xfExitWithAccount} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';

export const GetXfExits = (props) => {
  console.log(props)
  const { error, loading, data } = useQuery(xfExitWithAccount(props.account));

  let i = 0;
  let array = []
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let array = data.xfLobbyExits.map((data) => (
    <tr key={data.id}>
    <td>{data.timestamp}</td>
    <td>{data.xfAmount}</td>
</tr>
  
))
  return(
    <>
    <div>
      <Table striped bordered variant="dark">
          <thead>
            <tr>
              <td>
                TimeStamp of Exit
              </td>
              <td>
                Transform Amount Total (HEX)
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
