import React from 'react';
import * as logo from './../images/rzp-logo.svg';

// TODO: 
// Add 'for razorpay' in todo
// for italics
// razorpay(logo)

function Header() {
  return (
    <header className="center">
      IFSC Checker <i>for</i>
      <img src={'/images/../images/rzp-logo.svg'} alt="razorpay" className="rzp-logo"/>
    </header>
  );  
}

export default Header;