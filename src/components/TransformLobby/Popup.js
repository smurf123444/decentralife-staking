import React from 'react';  
import './styles.css';  


class Popup extends React.Component {  
  render() {  
return (  
<div className='popup'>  
<div className='popup_open'>  
<button onClick={this.props.closePopup}>X</button>  
<h1 class="h1_popup">TITS</h1>  
<h1 class="h1_popup">TITS</h1>  
</div>  
</div>  
);  
}  
}  
export default Popup;