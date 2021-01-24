import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_XFENTERS } from "../Querys/Queries";
import Table from 'react-bootstrap/Table';

export function GetXfEnters() {
  const { error, loading, data } = useQuery(LOAD_XFENTERS);

  let i = 0;
  let array = []
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
 
  return(
    <>
    <div>
      <Table striped bordered variant="dark">
      <thead>
            <tr>
              <td>
                rawAmount
              </td>
              <td>
                memberAddr
              </td>
              <td>
                enterDay
              </td>
              <td>
                timestamp
              </td>
            </tr>
          </thead>
          {data.xfLobbyEnters.map((data) => (
            <tr key={data.id}>
                <td>{data.rawAmount}</td>
                <td>{data.memberAddr}</td>
                <td>{data.enterDay}</td>
                <td>{data.timestamp}</td>
          </tr>
        ))}

  


        </Table>
    </div>
</>
    )
 }
}

export default GetXfEnters;
