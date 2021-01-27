import React, { Component } from 'react'
import dai from '../dai.png'
import { useQuery, gql } from "@apollo/client";
import { xfEnterWithAccount} from "./Querys/Queries";
import Table from 'react-bootstrap/Table';
import Web3 from 'web3'

class XfLobby extends Component {
  
  render() {
    const { error, loading, data } = useQuery(xfEnterWithAccount("0x5bC8bf5A75D221fF30b2c2B2a7235D6aeEFF4A84"));



    return (    <>
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

export default XfLobby;
