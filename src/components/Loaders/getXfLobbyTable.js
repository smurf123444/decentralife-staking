import React, { useEffect, useState, Component  } from "react";
import { useQuery, gql } from "@apollo/client";
import { xfEnterAndExitWithAccount, xfExitWithAccount} from "../Querys/Queries";
import Table from 'react-bootstrap/Table';
import Web3 from 'web3'
import '../TransformLobby/styles.css';  
import PopupXf from './PopupXf';
import moment from 'moment';
moment().format();
export const GetXfLobbyTable = (props) => {
  const { error, loading, data } = useQuery(xfEnterAndExitWithAccount(props.account));
  let ass = []
  let tits = []
 if(loading){
   return(<div>Loading...</div>)
 }
 else{
  let i = 0;
  data.xfLobbyEnters.map((data) => {
   tits[i] = [data.id, data.timestamp, data.memberAddr, data.data0, data.rawAmount,data.enterDay]
  i++
  })
  i = 0;
  data.xfLobbyExits.map((data) => {
    ass[i] = [data.id, data.timestamp , (data.xfAmount   / 1000000000) , data.memberAddr, data.data0]
  i++
  })
 }
 let i = 0
 function myDay() {
  var newArray = []
  for (var i = 351; i >= 1; --i)
  {
   newArray.push (<tr><td key={i}>{i}</td></tr>)
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
      amount = "~515m"
      newArray.push (<tr><td>{amount}</td></tr>)
    }
    if(i <= 19 && i >= 1)
    {
      amount = "~516m"
      newArray.push (<tr><td>{amount}</td></tr>)
    }
    if(i < 2 && i >= 1)
    {
      amount = "~1.5b"
      newArray.push (<tr><td>{amount}</td></tr>)
    }
  }
  return newArray;   // The function returns the product of p1 and p2
}
function myTotalEth(eth) {
  let i = 351
  let s = 351 - props.day + 1
  console.log(s)
  let newArray= [];
  let string = ""
  do{
    
    if(s >= i && s <= i)
   {
     
     newArray[i--] = (<tr><td className="td-height">{eth}</td></tr>)
   }
   else{
     string = ""
     newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)
   }
   }
   while(i > 0)
   return newArray; 
  // The function returns the product of p1 and p2
  
}
function hexToETHfunc(eth) {

  let i = 351
  let s = 351 - props.day + 1
  let newArray= [];
  let string = ""

  do{
    
   if(s >= i && s <= i)
  {
    string = eth
    newArray[i--] = (<tr><td className="td-height">{string + " HEX / 1 ETH"}</td></tr>)
  }
  else{
    string = ""
    newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)
  }
  }
  while(i > 0)
  return newArray;   
}


function yourHEXcalc(hex) {
  let i = 351
  let s = 351 - props.day + 1
  let newArray= [];
  let string = ""

  do{
   if(s >= i && s <= i)
  {
    string = hex
    newArray[i--] = (<tr><td className="td-height">{string}</td></tr>)
  }
  else{
    string = ""
    newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)
  }
  }
  while(i > 0)
  return newArray;   // The function returns the product of p1 and p2
}

function yourETHcalc(hex) {
  let i = 351
  let s = 351 - props.day + 1
  let newArray= [];
  let string = ""
  do{
    if(s >= i && s <= i)
   {
     string = hex
     newArray[i--] = (<tr><td className="td-height">{string}</td></tr>)
   }
   else{
     string = ""
     newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)
   }
   }
   while(i > 0)
   return newArray;   // The function returns the product of p1 and p2
}
 

function yourButtoncalc() {
  let i = 351
  let s = 351 - props.day + 1
  let newArray= [];
  let string = ""
  console.log(props.yourEntersButton)
  do{
    if(s >= i && s <= i)
   {
     newArray[i--] = (<tr><td className="form-button-height">   

     <form className="form-button-height" id={s} onSubmit={(event) => {
     
       event.preventDefault()
       props.yourExitButton()
       props.func(parseInt(event.target.getAttribute("id")));

       }}>
         
       <button type="submit" className="form-button-height">Exit!</button>
       </form></td></tr>)
   }
   else{
     string = ""
     newArray[i--] = (<tr><td className="td-heightDim">{string}</td></tr>)
   }
   }
   while(i > 0)
   return newArray;   // The function returns the product of p1 and p2
}



let transformer = 0
class TransformTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      day : this.props.day,
      showPopup: false,
      loading: false
    };
    this.xfLobbyExit = this.xfLobbyExit.bind(this);
    transformer = this;
    
  }
  
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  componentDidMount(){
    transformer = this;
  }
  componentWillUnmount(){
    transformer = null;
  }

  // xfLobbyExit(){
  //   console.log('Came to this object ')
  //   this.props.xfLobbyExit(this.state.day);
  // }

  xfLobbyExit(s){
    console.log('Came to this object ' + s.toString())
    props.xfLobbyExit(s);
    
  }



  
  render() {






    let popUpXf =
      <div>  
          <button type="popup" onClick={this.togglePopup.bind(this)}> Enter     </button>  
          {this.state.showPopup ? <PopupXf  text='X' closePopup={this.togglePopup.bind(this)} fun={props.func} account={props.account}/> : null }  
      </div>  
    
    function yourButtoncalc(day,account,eth,currentDay,enterDay) {

      // console.log('day: ' + day + ' account: ' + account+' eth: '+eth);
       
       let i = 351
       var s = 0
       s = 351 - day + 1;
     
       let newArray= [];
       let string = ""
       
       do{
         day++;
         
         if(eth[i] !== null && eth[i] === true)
     
         {
     
           s = 351 - day + 1;
         
           newArray[i] = (<tr><td className="form-button-height">   
     
                               <form className="form-button-height" id={s} onSubmit={(event) => {
                               
                                 event.preventDefault()
                                 
                                 account(parseInt(event.target.getAttribute("id")));
     
                                 }}>
                                   
                                 <button type="submit" className="form-button-height">Exit!</button>
                                 </form></td></tr>
                           )
                          
     
     
        }
        /*
      <
         */
        if(currentDay[350 - i + 1] === true)
        {
     
         newArray[i] = ( <tr><td className="form-button-height">   
                            {popUpXf}
       
           </td></tr>
                         )
        }
     
        else if (eth[i] !== true)
        {
         string = ""
         newArray[i] = (<tr><td className="td-heightDim">{string}</td></tr>)
        }
         i--;
        }
         while(i > 0) 
       
                // The function returns the product of p1 and p2
     return newArray;
     }
     

    return (
      
                      
                        yourButtoncalc(props.closing, this.xfLobbyExit, props.yourExitButton, props.yourEnterButton, props.xfLobbyEnter)

    );
  }
  
}



 let vag = []
 while (i < tits.length) {
  while (i < ass.length) {

    if(tits[i][0] === ass[i][0]){
        vag.push(tits[i])
      i++
    }
   }
    i++
}
i = 0
 while (i < vag.length) {
    if(vag[i][1] === tits[i][1]){
      tits[i] = 0
    }

    i++
   }
i = 0
let array = []
while (i < tits.length)
{
if(tits[i] === 0)
{
  i++
}
else
{
  /*

    id
      timestamp
      memberAddr
      data0
      rawAmount
      enterDay
      */
  array[i] = (
    <>
    <tr key={data.id}>

   <td>{/*timestamp*/
   moment(tits[i][1] * 1000).format('L')}</td>

   <td> {/*memberaddr*/tits[i][2]}</td>

   <td>{/*rawAmount*/tits[i][4] }</td>

   <td> {/*enterDay*/tits[i][5] }</td>

    </tr>
    </>
   )
   i++
}
}

 return(
  <>
  <div>
    <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <td>
            {myDay()}
            </td>
            <td>
            {myAvailableHex()}
            </td>
            <td>
             {myTotalEth("Tits")}
            </td>
            <td>
              {hexToETHfunc("Tits")}
            </td>
            <td>
              {
                yourHEXcalc("Tits")
              }
            </td>
            <td>
              {yourETHcalc("Tits")}
            </td>
            <td>
              {<TransformTable />}
            </td>
          </tr>
        </thead>
        {array}


      </Table>
  </div>
</>
)
}

export default GetXfLobbyTable;
