import React from 'react';  
import '../TransformLobby/styles.css';  
import Web3 from 'web3'
import TokenFarm from '../../assets/TokenFarm.json'
let web3 = new Web3(new Web3.providers.HttpProvider('https://kovan.infura.io/v3/' + '885661b2ff2f4167b4c6570a07306408'));

class PopupStakeEnd extends React.Component {  
  web3;

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      tokenFarm: '',
      account:''
    };

    this.handleChange = this.handleChange.bind(this);
    const web3 = window.web3
    const tokenFarm = new web3.eth.Contract(TokenFarm, '0x752A2B1C0Da8E07da1a78c512A576106b57DCc23')
    this.setState({ tokenFarm })
  }
  
enterDay = (value) =>{
    this.state.tokenFarm.methods.xfLobbyEnter(this.props.account).send({ from: this.props.account, value: value})
  
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {  


       let test = ''
return (  
<div className='popup'>  
<div className='popup_open'>  
<button onClick={this.props.closePopup}>X</button>  

<center><h1 class="h1_popup">⚠️ Warning ⚠️</h1>  </center>

<center><h4 class="h1_popup">-</h4>  </center>
<center><h4 class="h1_popup">Ending a Stake EARLY or LATE can cause a penalty (up to 100%)</h4>  </center>

<center><h4 class="h1_popup">-</h4>  </center>
<center><h4 class="h1_popup">Make Absolutely SURE that your stake is DUE today!</h4>  </center>

<center><h4 class="h1_popup">-</h4>  </center>
<center><h4 class="h1_popup">WE DO NOT ISSUE REFUNDS AND CANNOT ROLLBACK TRANSACTIONS ON ETHEREUM</h4>  </center>
<center><h4 class="h1_popup">-</h4>  </center>
<center><h4 class="h1_popup">Click "Submit" if you confirm or EXIT this popup...</h4>  </center>
<form onSubmit={(event) => {
                event.preventDefault()
                console.log('TEST')
                this.props.func(this.props.stakeIndex, this.props.stakeID)
              }}>
                   <button type="submit" className="btn btn-primary btn-block btn-lg">Submit</button>

</form>

</div>  
</div>  
);  
}  

}  

export default PopupStakeEnd;