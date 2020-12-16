import React, { Component } from 'react'
import TransformTable from './TranformTable'
import Table from 'react-bootstrap/Table';
class TransformList extends Component {

  render() {


    return (
      

<Table striped bordered variant="dark">

  <tbody>
    <tr>
    <td><TransformTable 
    
    day={this.props.day}
    totalEth={this.props.totalEth} 
    hexToEth={this.props.hexToEth} 
    closing={this.props.closing}
    yourHex={this.props.yourHex}
    yourEth={this.props.yourEth} 
    xfLobbyExit={this.props.xfLobbyExit}/></td>
    </tr>

  </tbody>

</Table>
     


          






    );
  }
}

export default TransformList;
