import React, { Component } from 'react';
import io from 'socket.io-client';
import Loader from './Loader';
import {connect} from 'react-redux';
import bankAction from '../store/actions/bankAction';

const socket = io('http://localhost:8001')

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IFSC: '', 
      isLoading: false,
      bankDetails: null,
      prevSearches: [],
    }
  }

  handleChange = e => {
    this.setState({
      IFSC: e.target.value.trim()
    }, () => {
      socket.emit('bankQuery', this.state.IFSC)
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const {IFSC} = this.state;

    if(IFSC.length === 11) {
      this.setState({
        isLoading: true, 
        IFSC: ''
      });
      this.setBankData(IFSC)
    } 
  }

  convertReadable = (str) => {
    return str.split(' ').map(str => `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`).join(' ');
  }

  hanldePrevSearch = e => {
    // console.log()
    this.setState({
      isLoading : true
    })
    this.setBankData(e.target.innerHTML)
  }
  
  setBankData = (ifsc) => {
    this.props.dispatch(bankAction.getBankDetails(ifsc, (isFounded) => {
      if(isFounded) {
        this.setState({
          isLoading: false,
          IFSC: ''
        })
        this.props.dispatch(bankAction.setBankDetailsIntoDB())
      }
    }))
  }


  render() {
    const { isLoading, IFSC} = this.state;
    const {prevSearches, bankDetails} = this.props;
    
    return (
      <main>
        <div className="wrapper">
          <form onSubmit={this.handleSubmit} className={`form ${IFSC.length === 11 ? 'success' : '' || IFSC.length > 11 ? 'danger' : ''}`}>
            <input type="text" onChange={this.handleChange} className="input-field" placeholder="Enter Bank's IFSC Code" value={IFSC}/>
            <button type="submit" className="btn">Get Details</button>
          </form>
          {
            prevSearches.length ?  (
              <div className="prev-wrapper">
                <div className="prev-head center">Previous Searches</div>
                <div className="prev-searches-container">
                {
                  prevSearches.map((search, i) => (
                    <button className="prev-search" onClick={this.hanldePrevSearch} key={i}>{search}</button>
                  ))
                }
                </div>
              </div>
            ) : '' 
          }
          {
            isLoading ? <Loader /> : (
              <div>
              {
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
                      <div className="info-value"> {this.convertReadable(bankDetails.ADDRESS)}</div>
                    </div>
                    <div className="bank-detail-box">
                      <div className="bank-info">
                        <span className="info-head">Contact - </span> 
                        <div className="info-value"> {bankDetails.CONTACT}</div>
                      </div>
                      <div className="bank-info">
                        <span className="info-head">City - </span> 
                        <div className="info-value"> {this.convertReadable(bankDetails.CITY)}</div>
                      </div>
                    </div>
                    <div className="bank-info">
                      <span className="info-head">District - </span> 
                      <div className="info-value"> {this.convertReadable (bankDetails.DISTRICT)}</div>
                    </div>
                    <div className="bank-info">
                      <span className="info-head">State - </span> 
                      <div className="info-value"> {this.convertReadable(bankDetails.STATE)}</div>
                    </div>
                  </div>
                ) : ''
              }
              </div>
            )
          }
        </div>
        <div className="overlay"></div>
      </main>
    );
  }
}

function mapStateToProps(state) {
  const {bankDetails, prevSearches} = state;
  return {
    bankDetails,
    prevSearches
  }
}

export default connect(mapStateToProps)(Main);