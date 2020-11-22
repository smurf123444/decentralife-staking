import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
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
class TransformTable extends Component {

  render() {
    return (
        <Table striped bordered variant="dark">
          <thead>
            <tr>
              <td>
                Day
              </td>
              <td>
                Available Hex
              </td>
              <td>
                Total ETH
              </td>
              <td>
                HEX/ETH
              </td>
              <td>
                Closing
              </td>
              <td>
                Your HEX
              </td>
              <td>
                Your ETH
              </td>
              <td>
              </td>
            </tr>
          </thead>
          <tbody>
              {daysTransform.map(function(object, i){
                return <tr>
                        <td>{object}/351</td>
                        <td>550M</td>
                        <td>
                          100
                        </td>
                        <td>
                          52,349
                        </td>
                        <td>
                          Closed
                        </td>
                        <td>
                          435,341
                        </td>
                        <td>
                          6.300
                        </td>
                        <td>
                          <Button />
                        </td>
                        </tr>
                })}
       </tbody>
      </Table>
    );
  }
}

export default TransformTable;
