import React, { Component } from 'react';
import io from 'socket.io-client';
import Loader from './Loader';
import {connect} from 'react-redux';
import bankAction from '../store/actions/bankAction';
import BankDetail from './BankDetail';

const socket = io('http://localhost:8001')

let online = true;

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IFSC: '', 
      isLoading: false,
      bankQueryResult : [],
      online: true
    }
  }

  handleChange = e => {
    if(this.state.IFSC === '') {
      this.setState({
        bankQueryResult: []
      })
    }
    
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

  handleSearch = e => {
    this.setState({
      isLoading : true
    })
    this.setBankData(e.target.id||e.target.innerHTML)
    this.setState({
      bankQueryResult: []
    })
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

  getBankQuery = ((e) => {
    socket.on('queryResult', (banks) => {
      this.setState({
        bankQueryResult: banks
      })
    });
  })()

  setNetworkStatus = (() => {
    setTimeout(() => {
      window.addEventListener('offline', () => {
        this.setState({
          online: false
        })
      })
      window.addEventListener('online', () => {
        this.setState({
          online: true
        })
      })
    }, 1000)
  })()

  render() {
    const { isLoading, IFSC, bankQueryResult, online} = this.state;
    const {prevSearches, bankDetails} = this.props;

    return (
      online ? (
        <main>
        <div className="wrapper">
          <div className="form-wrapper">
            <form onSubmit={this.handleSubmit} className={`form ${IFSC.length === 11 ? 'success' : '' || IFSC.length > 11 ? 'danger' : ''}`}>
              <input type="text" onChange={this.handleChange} className="input-field" placeholder="Enter Bank's IFSC Code" value={IFSC}/>
              <button type="submit" className="btn">Get Details</button>
            </form>
            {
              bankQueryResult.length > 0 && (
                <div className="bank-query">
                  {
                    bankQueryResult && bankQueryResult.map(bank => (
                      <button 
                      id={bank.IFSC} 
                      onClick={this.handleSearch} 
                      className="drop-list btn">{bank.BANK}, {bank.CITY}</button>
                    ))
                  }
                </div>
              )
            }
          </div>
          {
            prevSearches.length ?  (
              <div className="prev-wrapper">
                <div className="prev-head center">Previous Searches</div>
                <div className="prev-searches-container">
                {
                  prevSearches.map((search, i) => (
                    <button className="prev-search" onClick={this.handleSearch} key={i}>{search}</button>
                  ))
                }
                </div>
              </div>
            ) : '' 
          }
          {
            isLoading ? <Loader /> : (
              <BankDetail />
            )
          }
        </div>
        <div className="overlay"></div>
      </main>
      ) : <p className="err">Please connect to internet</p>
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