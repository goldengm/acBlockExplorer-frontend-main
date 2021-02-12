import {
  GET_LATEST_TRANSACTIONS,
  GET_RECENT_TRANSACTIONS,
  TRANSACTION_ERROR,
  GET_TRANS_DETAIL
} from '../actions/types';

const initialState = {
  transactions: [],
  transaction: null,
  transdetail: {},
  loading: true,
  error: {}
};

function transactionReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LATEST_TRANSACTIONS:
      return {
        ...state,
        transactions: payload,
        loading: false
      };
    case GET_RECENT_TRANSACTIONS:
      return {
        ...state,
        transactions: payload,
        loading: false
      };
    case TRANSACTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case GET_TRANS_DETAIL:
      return {
        ...state,
        transdetail: payload,
        loading: false
      }
    default:
      return state;
  }
}

export default transactionReducer;
