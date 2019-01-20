import React, { Component } from 'react';
import io from 'socket.io-client';
import Loader from './Loader';
import {connect} from 'react-redux';
import bankAction from '../store/actions/bankAction';
import BankDetail from './BankDetail';
import PropTypes from 'prop-types';


const socket = io('http://localhost:8001');

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IFSC: '', 
      isLoading: false,
      bankQueryResult : [],
      online: true,
      errMsg: ''
    }
  }

  handleChange = e => {
    if(this.state.IFSC === '') {
      this.setState({
        bankQueryResult: []
      })
    }
    
    this.setState({
      IFSC: e.target.value
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
          IFSC: '',
          errMsg: ''
        });
        bankAction.setBankDetailsIntoDB()
      } else {
        this.setState({
          isLoading: false,
          errMsg: "IFSC Code not found."
        })
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
    const { isLoading, IFSC, bankQueryResult, online, errMsg} = this.state;
    const {prevSearches} = this.props;

    return (
      online ? (
        <main>
        <div className="wrapper">
          <div className="form-wrapper">
            <form onSubmit={this.handleSubmit} className={`form ${IFSC.length === 11 ? 'success' : '' || IFSC.length > 11 ? 'danger' : ''}`}>
              <input type="text" onChange={this.handleChange} className="input-field" placeholder="Enter Bank's IFSC Code OR Bank Name" value={IFSC}/>
              <button type="submit" className="btn">Get Details</button>
            </form>
            {
              bankQueryResult.length > 0 && (
                <div className="bank-query">
                  {
                    bankQueryResult && bankQueryResult.map(bank => (
                      <button
                      key={bank._id} 
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
            isLoading ? <Loader /> : errMsg ? <p className="errMsg">{errMsg}</p> : <BankDetail/>
          }
        </div>
        <div className="overlay"></div>
      </main>
      ) : <p className="errMsg">Please connect to internet.</p>
    );
  }
}

function mapStateToProps(state) {
  const {prevSearches} = state;
  return {
    prevSearches
  }
}

Main.propTypes = {
  prevSearches: PropTypes.array
}

export default connect(mapStateToProps)(Main);