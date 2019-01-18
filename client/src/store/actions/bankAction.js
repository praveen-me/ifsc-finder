import store from './../store';

const bankAction = {
  getBankDetails : (IFSC, cb) => {
    return (dispatch, getState) => {
      fetch(`https://ifsc.razorpay.com/${IFSC}`)
      .then(res => res.json())
      .then(data => {
        const {prevSearches} = store.getState()
        cb(true)       
        return dispatch({
          type: 'SET_BANK',
          bankDetails : {
            prevSearches: prevSearches.includes(IFSC) ? prevSearches : [...prevSearches, IFSC],
            bankDetails: data,
          }
        })
      })
    }
  }
}

export default bankAction;