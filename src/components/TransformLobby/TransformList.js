import React, { Component } from 'react'
import TransformTable from './TranformTable'
import Table from 'react-bootstrap/Table';
import { makeData, Logo, Tips } from "./Utils.js";
import style from './styles.css'
import ReactTable from "react-table";
class TransformList extends Component {
  render() {
    return (
      
<div class="table-scroll">
<div>
      </div>


  <tbody>
    <tr>
    <td><TransformTable 
    
    day={this.props.day}
    totalEth={this.props.totalEth} 
    hexToEth={this.props.hexToEth} 
    closing={this.props.closing}
    yourAddress={this.props.yourAddress}
    yourHex={this.props.yourHex}
    yourEth={this.props.yourEth}
    yourExitButton={this.props.yourExitButton}
    yourEnterButton={this.props.yourEnterButton}
    xfLobbyExit={this.props.xfLobbyExit}
    xfLobbyEnter={this.props.xfLobbyEnter}
    xfLobbyMembers={this.props.xfLobbyMembers}/></td>
    </tr>

  </tbody>


</div>


          






    );
  }
}

export default TransformList;
