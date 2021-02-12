import api from '../utils/api';
import {
  GET_LATEST_TRANSACTIONS,
  GET_RECENT_TRANSACTIONS,
  TRANSACTION_ERROR,
  GET_TRANS_DETAIL,
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Get Latest Blocks
export const getLatestTransactions = () => async (dispatch) => {
  try {
    const res = await api.get('/acchains/latestTransactions');
    dispatch({
      type: GET_LATEST_TRANSACTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response }
    });
  }
};

export const getTransDetail = (transhash) => async (dispatch) => {
  try {
    const res = await api.get(`/acchains/getTrans/${transhash}`);
    dispatch({
      type: GET_TRANS_DETAIL,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response }
    });
  }
};


export const getRecentTransactions = (address, page, offset) => async (dispatch) => {
  try {
    const res = await api.get(`/acchains/getRecentTransactions/${address}/${page}/${offset}`);
    dispatch({
      type: GET_RECENT_TRANSACTIONS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: TRANSACTION_ERROR,
      payload: { msg: err.response }
    });
  }
};