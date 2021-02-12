import React, { Fragment, useEffect } from 'react';
import logo from '../../img/ancientcoin.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTransDetail } from '../../actions/transaction';
import { useParams } from 'react-router-dom';
import copy from 'copy-text-to-clipboard';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Transdetail = ({ getTransDetail, transdetail }) => {

    const { transhash } = useParams();

    toast.configure();
    const copyHashToClipboard = (hash) => {
     console.log(hash);
     copy(hash);
     toast("Copid!");
   };  

    useEffect(() =>{
        getTransDetail(transhash);
    }, [getTransDetail, transhash])


    let tran_hash;

    return (
        <Fragment>
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
                <div className="naji_block_panel">
                    <span className="naji_block_panel_num1">BlockHash</span>
                    <span className="naji_block_panel_num2">{ transdetail.blockHash }</span>    
                </div>
                <div className="naji_block_panel">
                    <span className="naji_block_panel_num1" >Hash</span>
                    <span className="naji_block_panel_num2_hash" onClick={e => copyHashToClipboard(transdetail.hash)}>{ transdetail.hash }</span>    
                </div>
                <div className="naji_block_panel">
                    <span className="naji_block_panel_num1">From</span>
                    <Link to={`/address/${transdetail.from}`} className="naji_block_panel_num2"><span className="naji_link">{ transdetail.from }</span></Link>    
                </div>
                <div className="naji_block_panel">
                    <span className="naji_block_panel_num1">To</span>
                    <Link to={`/address/${transdetail.to}`} className="naji_block_panel_num2"><span className="naji_link">{ transdetail.to }</span></Link>    
                </div>
                <div className="naji_block_panel">
                    <span className="naji_block_panel_num1">Value</span>
                    <span className="naji_block_panel_num2">{ transdetail.value }</span>    
                </div>
                <div className="naji_block_panel">
                    <span className="naji_block_panel_num1">Time</span>
                    <span className="naji_block_panel_num2">{transdetail.createdAt}</span>
                </div>
            </section>
        </Fragment>
    )
}

Transdetail.propTypes = {
    getTransDetail: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    transdetail: state.transaction.transdetail,
  });

  export default connect(mapStateToProps, { getTransDetail })(
    Transdetail
  );
