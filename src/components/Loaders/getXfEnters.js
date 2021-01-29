import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import { xfEnterWithAccount, xfExitWithAccount} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Web3 from 'web3'
import '../TransformLobby/styles.css';  
import Popup from '../TransformLobby/Popup';


export const GetXfEnters = (props) => {
  console.log(props)
  const { error, loading, data } = useQuery(xfEnterWithAccount(props.account));

  let i = 0;
  let array = []
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let array = data.xfLobbyEnters.map((data) => (
    <tr key={data.id}>
        <td>{Web3.utils.fromWei(data.rawAmount, "Ether")}</td>
        <td >{data.enterDay}</td>
        <td class="td-width">{data.id}</td>
  </tr>
  
))
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

export default GetXfEnters;
