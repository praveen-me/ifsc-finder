const initState = {
  bankDetails: null,
  prevSearches: [],
};

function rootReducer(state = initState, action) {
  switch (action.type) {
    case 'GET_BANK': {
      const { prevSearches, bankDetails } = action.bankDetails;
      return {
        bankDetails,
        prevSearches,
      };
    }
    default: return state;
  }
}

export default rootReducer;
