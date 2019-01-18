import React, { Component } from 'react';
import {connect} from 'react-redux';

function BankDetail(props) {
  const convertReadable = (str) => str.split(' ').map(str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`).join(' ');
  
  const {bankDetails} =  props;
  return (
    bankDetails ? (
      <div className="bank-details">
        <div className="bank-detail">
          <div className="bank-name">{bankDetails.BANK}</div>
          <div className="bank-code">({bankDetails.BANKCODE})</div>
        </div>
        <div className="bank-info">
          <span className="info-head">IFSC - </span> 
          <div className="info-value"> {bankDetails.IFSC}</div>
        </div>
        <div className="bank-info">
          <span className="info-head">Branch - </span> 
          <div className="info-value"> {bankDetails.BRANCH}</div>
        </div>
        <div className="bank-info">
          <span className="info-head">Address - </span> 
          <div className="info-value"> { convertReadable(bankDetails.ADDRESS)}</div>
        </div>
        <div className="bank-detail-box">
          <div className="bank-info">
            <span className="info-head">Contact - </span> 
            <div className="info-value"> {bankDetails.CONTACT}</div>
          </div>
          <div className="bank-info">
            <span className="info-head">City - </span> 
            <div className="info-value"> { convertReadable(bankDetails.CITY)}</div>
          </div>
        </div>
        <div className="bank-info">
          <span className="info-head">District - </span> 
          <div className="info-value"> { convertReadable(bankDetails.DISTRICT)}</div>
        </div>
        <div className="bank-info">
          <span className="info-head">State - </span> 
          <div className="info-value"> { convertReadable(bankDetails.STATE)}</div>
        </div>
      </div>
    ) : ''
  );
}

function mapStateToProps(state) {
  const {bankDetails} = state;
  return {
    bankDetails
  }
}

export default connect(mapStateToProps)(BankDetail);