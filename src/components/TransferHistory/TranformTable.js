import React, { Component } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import "./styles.css";
function myDay() {
  var newArray = []
  for (var i = 351; i >= 1; --i)
  {
   newArray.push (<tr><td>{i} / 351</td></tr>)
  }
  return newArray;
}
function myAvailableHex() {
  var newArray = []
  var amount = ""
  for (var i = 350; i >= 1; --i)
  {
    if(i >= 20)
    {
      amount = "500m"
      newArray.push (<tr><td>{amount}</td></tr>)
    }
    if(i <= 19 && i >= 1)
    {
      amount = "525m"
      newArray.push (<tr><td>{amount}</td></tr>)
    }
    if(i < 2 && i >= 1)
    {
      amount = "1.5b"
      newArray.push (<tr><td>{amount}</td></tr>)
    }
  }
  return newArray;   // The function returns the product of p1 and p2
}
function resolveAfter2Seconds(x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
};

function myTotalEth(eth, day) {
  var newArray = []
  let i = 351
  let s = 351 - day + 1
  console.log(day)
do{
    if(s >= i && s <= i){
   newArray[i--] = <tr><td className="td-height">{eth}</td></tr>
    }
    else{
    newArray[i--] = <tr><td className="td-height"></td></tr>
    }
  }
  while(i > 0)
  return newArray;   // The function returns the product of p1 and p2
}
function hexToETHfunc(eth, day) {
  var newArray = []
  let i = 351
  let s = 351 - day + 1
  console.log(day)
do{
    if(s >= i && s <= i){
   newArray[i--] = <tr><td className="td-height">{eth}</td></tr>
    }
    else{
    newArray[i--] = <tr><td className="td-heightDim">Closed</td></tr>
    }
  }
  while(i > 0)
  return newArray;   // The function returns the product of p1 and p2
}
function closingBool(day) {
  var newArray = []
  let i = 351
  let s = 351 - day + 1
  console.log(day)
  let string = ""
  do{
   if(s >= i && s <= i)
  {
    string = "Open"
    console.log(s)
    newArray[i--] = (<tr><td className="td-height">{string}</td></tr>)
  }
  else{
    string = "Closed"
    newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)

  }

  }
  while(i > 0)

  return newArray;   // The function returns the product of p1 and p2
}
function yourHEXcalc() {
  var newArray = []
  var amount = false
  var sting = ""
  if(amount === false)
  {
    sting = "{your HEX}"
  }
  for (var i = 351; i >= 1; --i)
  {
   newArray.push (<tr><td>{sting}</td></tr>)
  }
  return newArray;   // The function returns the product of p1 and p2
}
function yourETHcalc() {
  var newArray = []
  var amount = false
  var sting = ""
  if(amount === false)
  {
    sting = "{your ETH}"
  }
  for (var i = 351; i >= 1; --i)
  {
   newArray.push (<tr><td>{sting}</td></tr>)
  }
  return newArray;   // The function returns the product of p1 and p2
}

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

                      <tr>
                        <td>
                        {myDay()}
                        </td>
                        <td>
                          {myAvailableHex()}
                        </td>
                        <td>
                          {myTotalEth(this.props.totalEth, this.props.day)}
                        </td>
                        <td>
                          {hexToETHfunc(this.props.hexToEth, this.props.day)} 
                        </td>
                        <td>
                         {closingBool(this.props.day)}
                        </td>
                        <td>
                          {yourHEXcalc(this.props.yourHex)}
                        </td>
                        <td>
                          {yourETHcalc(this.props.yourEth)}
                        </td>
                         
                        <td>
                        <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let day
                day = this.input.value.toString()
                this.props.xfLobbyExit(day)
              }}>

              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
                <div className="input-group-append">
                  <div className="input-group-text">
                  
                    &nbsp;&nbsp;&nbsp; Day
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">Exit!</button>
            </form>
</td>
</tr>   
       </tbody>
      </Table>
    );
  }
}

export default TransformTable;
