import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { history } from './store';

import Dashboard from './components/dashboard/Dashboard';
import Addressboard from './components/dashboard/Addressboard';

import Blockdetail from './components/detail/Blockdetail';
import Transdetail from './components/detail/Transdetail';


// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes history={history}>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/address/:address" element={<Addressboard />} />

          <Route path="/block/:blocknumber" element={<Blockdetail />} />
          <Route path="/tx/:transhash" element={<Transdetail />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
