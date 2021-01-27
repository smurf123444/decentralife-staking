import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import { xfEnterWithAccount} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Web3 from 'web3'
export const GetXfEnters = (props) => {
  console.log(props)
  const { error, loading, data } = useQuery(xfEnterWithAccount(props.account));

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
                Ether Amount Deposited.
              </td>
              <td>
                enterDay
              </td>
            </tr>
          </thead>
          {data.xfLobbyEnters.map((data) => (
            <tr key={data.id}>
                <td>{Web3.utils.fromWei(data.rawAmount, "Ether")}</td>
                <td>{data.enterDay}</td>
          </tr>
        ))}

  


        </Table>
    </div>
</>
    )
 }
}

export default GetXfEnters;
