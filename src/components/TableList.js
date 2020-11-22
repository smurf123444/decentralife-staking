import React, { Component } from 'react'
import TransformTable from './TranformTable'
import Table from 'react-bootstrap/Table';
function myFunction() {
  var newArray = []
  for (var i = 1; i <= 351; ++i)
  {
   newArray.push (i)
  }
  return newArray;   // The function returns the product of p1 and p2
}
let daysTransform = myFunction()
var numrows = 365;
class TableList extends Component {

  render() {


    return (
      

<Table striped bordered variant="dark">

  <tbody>
    <tr>
    <td><TransformTable /></td>
    </tr>

  </tbody>

</Table>
     


          






    );
  }
}

export default TableList;
