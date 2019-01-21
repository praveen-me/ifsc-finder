import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


function BankDetail(props) {
  const convertReadable = (str) => str ? str.split(' ').filter(str => str.length > 0).map(str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`).join(' ') : 'Not available'
  
  const {bankDetails} =  props;
  return (
    bankDetails ? (
      <div className="bank-details">
        <div className="bank-detail">
          <div className="bank-name">{bankDetails.BANK}</div>
          <div className="bank-code">({bankDetails.BANKCODE})</div>
        </div>
        <div className="bank-info">
          <span className="info-head">IFSC </span> 
          <div className="info-value"> {bankDetails.IFSC}</div>
        </div>
        <div className="bank-info">
          <span className="info-head">Branch </span> 
          <div className="info-value"> {bankDetails.BRANCH}</div>
        </div>
        <div className="bank-info">
          <span className="info-head">Address </span> 
          <div className="info-value"> { convertReadable(bankDetails.ADDRESS)}</div>
        </div>
        <div className="bank-info">
          <span className="info-head">Contact </span> 
          <div className="info-value"> {bankDetails.CONTACT ? bankDetails.CONTACT : 'Not Available'}</div>
        </div>
        <div className="bank-info">
          <span className="info-head">City </span> 
          <div className="info-value"> { convertReadable(bankDetails.CITY)}</div>
        </div>
        <div className="bank-info">
          <span className="info-head">District </span> 
          <div className="info-value"> { convertReadable(bankDetails.DISTRICT)}</div>
        </div>
        <div className="bank-info">
          <span className="info-head">State </span> 
          <div className="info-value"> { convertReadable(bankDetails.STATE)}</div>
        </div>
      </div>
    ) : <div></div>
  );
}

function mapStateToProps(state) {
  const {bankDetails} = state;
  return {
    bankDetails
  }
}

BankDetail.propTypes = {
  bankDetails: PropTypes.object
}

export default connect(mapStateToProps)(BankDetail);