import store from './../store';

const bankAction = {
  getBankDetails : (IFSC, cb) => {
    return (dispatch) => {
      fetch(`https://ifsc.razorpay.com/${IFSC}`)
      .then(res => {
        if(res.status === 200) {
          res.json()
            .then(data => {
              const {prevSearches} = store.getState()
              dispatch({
                type: 'GET_BANK',
                bankDetails : {
                  prevSearches: prevSearches.includes(IFSC) ? prevSearches : [...prevSearches, IFSC],
                  bankDetails: data,
                }
              })
              return cb(true)
            })       
        } else {
          return res.json()
            .then(() => cb(false))
        }
      })
    }
  },
  setBankDetailsIntoDB : () => {
    return (dispatch) => {
      const {IFSC, BANK, CITY} = store.getState().bankDetails;
      const bankDetails = {
        IFSC,
        BANK,
        CITY
      }
      fetch(`http://localhost:8001/banks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bankDetails)
      })
    }
  }
}

export default bankAction;