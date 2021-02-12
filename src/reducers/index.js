import { combineReducers } from 'redux';
import block from './block';
import transaction from './transaction';

export default combineReducers({
  block,
  transaction
});
