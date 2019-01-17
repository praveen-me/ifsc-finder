import React, { Component } from 'react';
import Loader from './Loader';

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
    fetch(`https://ifsc.razorpay.com/${ifsc}`)
      .then(res => res.json())
      .then(data => {
        const {prevSearches} = this.state;
        return this.setState({
          prevSearches: prevSearches.includes(ifsc) ? prevSearches : [...prevSearches, ifsc],
          bankDetails: data,
          isLoading: false,
          IFSC: ''
        })
      })
  }


  render() {
    const {prevSearches, bankDetails, isLoading, IFSC} = this.state;
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
                  prevSearches.map(search => (
                    <button className="prev-search" onClick={this.hanldePrevSearch}>{search}</button>
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

export default Main;