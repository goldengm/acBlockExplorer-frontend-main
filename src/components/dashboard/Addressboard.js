import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecentTransactions } from '../../actions/transaction';
import logo from '../../img/ancientcoin.png';
import '../../style.css';
import Transaction from './Transaction';
import { ethers, BigNumber } from 'ethers';
import axios from 'axios';

const Addressboard = ({ 
  getRecentTransactions,
  transaction,
}) => {
  const [price, setPrice] = useState(0);
  const [balance, setBalance] = useState({_hex: '0x000000000000000000000000', _isBigNumber: true});
  const { address } = useParams();
  const [transactionsData, SetTransactionsData] = useState({});
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  const [offset, setOffset] = useState(25);
  const provider = new ethers.providers.JsonRpcProvider('https://ancientscoin.com/rpc')
  
  useEffect(() => {
    getRecentTransactions(address, page, offset);
    provider.getBalance(address).then((val) => {
      setBalance(val)
      axios.get("https://ancientscoin.com/ancient/users/getAcprice").then((result) => {
        setPrice(result.data.acPrice)
        let bignum = BigNumber.from((result.data.acPrice * (10 ** 14)).toString()); 
        if(result.data.message == "Success")
          setValue(val.div(10 ** 14).mul(bignum));
      })
    });
  }, []);

  useEffect(() => {
    getRecentTransactions(address, page, offset);
    provider.getBalance(address).then((val) => {
      setBalance(val)
      axios.get("https://ancientscoin.com/ancient/users/getAcprice").then((result) => {
        setPrice(result.data.acPrice)
        let bignum = BigNumber.from((result.data.acPrice * (10 ** 14)).toString()); 
        if(result.data.message == "Success")
          setValue(val.div(10 ** 14).mul(bignum));
      })
    });
  }, [getRecentTransactions, page, offset])

  useEffect(() => {
    setPage(1);
    setOffset(25);
    getRecentTransactions(address, page, offset);
    provider.getBalance(address).then((val) => {
      setBalance(val)
      axios.get("https://ancientscoin.com/ancient/users/getAcprice").then((result) => {
        setPrice(result.data.acPrice)
        let bignum = BigNumber.from((result.data.acPrice * (10 ** 14)).toString()); 
        if(result.data.message == "Success")
          setValue(val.div(10 ** 14).mul(bignum));
      })
    });
  }, [address])

  useEffect(() => {
    SetTransactionsData(transaction.transactions);
  },[transaction]);

  return (
    <section className="naji-container">     
      <header className="naji-header">
          <div className="naji-header_logoContainer">
              <a className="" href="/">
                  <img src={logo}  className="naji-header_logoImg" alt="logo" />
              </a>
          </div>
          <div className="naji-header_titleContainer">
              <a className="naji-LocalizedLink_link" href="#">
                  <b>Ancient Coin</b><span> BlockChain Explorer</span>
              </a>
          </div>
          <div className="naji-Header_triangleSign">
              <div className="naji-Header_straightLine">
          
              </div>
              <div className="naji-Header_triangle">
                  <div className="naji-Header_innerTriangle">
                  </div>
              </div>
          </div>
      </header>
      <div>
          <div className="naji-content_titleContainer">
            <div className="naji-LocalizedLink_link">
                <b>Address: </b><span>{address}</span>
            </div>
          </div>
          <div className="naji-content_titleContainer">
              <span className="naji-LocalizedLink_link">
                  <b>Balance: </b><span>{parseFloat(ethers.utils.formatEther(balance)).toFixed(4)}</span>
              </span>
              <span className="naji-LocalizedLink_link">
                  <b>Value: </b><span>${parseFloat(ethers.utils.formatEther(value)).toFixed(4)}</span>
                  <span style={{fontSize:'11px'}}> (@ ${price.toFixed(2)}/ancientcoin)</span>
              </span>
          </div>
      </div>
      <Transaction transaction={transactionsData} page={page} offset={offset} />
      
      <div className="naji-page">
        <button className="naji-pageButton right" onClick={() => {
            if(transactionsData.length == offset)
              setPage(page+1)
          }}>
          <div className="naji-Search_searchButtonIcon"></div>
        </button>
        {/* <Input bordered={false} value={page} onChange={(e) => {
              setPage(e.target.value);
          }} className="naji-pageInput right" /> */}
        <span className="naji-pageButton right" >{page}</span>
        <button className="naji-pageButton right" onClick={() => {
            if(page !== 1)
              setPage(page-1)
          }}>
          <div className="naji-Search_searchButtonIcon-reverse"></div>
        </button>
        <div className="naji-offset">
        <button className="naji-offsetButton right" onClick={()=> {
          setOffset(10)
          setPage(1)
        }}>10</button>
        <button className="naji-offsetButton right" onClick={()=> {
          setOffset(25)
          setPage(1)
        }}>25</button>
        <button className="naji-offsetButton right" onClick={()=> {
          setOffset(50)
          setPage(1)
        }}>50</button>
        </div>
      </div>
    </section>
  );
};

Addressboard.propTypes = {
  block: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  searchResult: state.block.searchResult,
  block: state.block,
  transaction: state.transaction
});

export default connect(mapStateToProps, { getRecentTransactions })(
  Addressboard
);
