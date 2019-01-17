import React, { Component } from 'react';

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

      fetch(`https://ifsc.razorpay.com/${IFSC}`)
        .then(res => res.json())
        .then(data => {
          const {prevSearches} = this.state;
          return this.setState({
            prevSearches: prevSearches.includes(IFSC) ? prevSearches : [...prevSearches, IFSC],
            bankDetails: data,
            isLoading: false,
            IFSC: ''
          })
        })
    } 
  }

  render() {
    const {prevSearches, bankDetails, isLoading, IFSC} = this.state;
    return (
      <main>
        <div className="wrapper">
          <div className="prev-searches-container">
            {
              prevSearches && prevSearches.map(search => (
                <div className="prev-search">{search}</div>
              ))
            }
          </div>
          <form onSubmit={this.handleSubmit} className={`form ${IFSC.length === 11 ? 'success' : '' || IFSC.length > 11 ? 'danger' : ''}`}>
            <input type="text" onChange={this.handleChange} className="input-field" placeholder="Enter Bank's IFSC Code" value={IFSC}/>
            <button type="submit" className="btn">Get Details</button>
          </form>
          {
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
                  <span className="info-head">Adderes </span> 
                  <div className="info-value"> {bankDetails.ADDRESS}</div>
                </div>
                <div className="bank-detail-box">
                  <div className="bank-info">
                    <span className="info-head">Contact </span> 
                    <div className="info-value"> {bankDetails.CONTACT}</div>
                  </div>
                  <div className="bank-info">
                    <span className="info-head">City </span> 
                    <div className="info-value"> {bankDetails.CITY}</div>
                  </div>
                </div>
                <div className="bank-detail-box">
                  <div className="bank-info">{bankDetails.DISTRICT}</div>
                  <div className="bank-info">{bankDetails.STATE}</div>
                </div>
              </div>
            ) : ''
          }
        </div>
        <div className="overlay"></div>
      </main>
    );
  }
}

export default Main;