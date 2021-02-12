import React, { Fragment, useEffect } from 'react';
import logo from '../../img/ancientcoin.png';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getBlockDetail } from '../../actions/block';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import copy from 'copy-text-to-clipboard';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blockdetail = ({ getBlockDetail, blockdetail }) => {

    const { blocknumber } = useParams();

    toast.configure();
    const copyHashToClipboard = (hash) => {
     console.log(hash);
     copy(hash);
     toast("Copid!");
   };  

    useEffect(() =>{
        getBlockDetail(blocknumber);
    }, [getBlockDetail, blocknumber])


    let tran_hash;
    if(blockdetail.transactions && Object.keys(blockdetail.transactions).length > 0){
        tran_hash = blockdetail.transactions.map((item) => (
            <Link to={`/tx/${item}`} className="naji_link"><span>{item}</span></Link>
        ))
    } else{
        tran_hash = (<>No Transaction</>);
    }

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
                    <span className="naji_block_panel_num1">Number</span>
                    <span className="naji_block_panel_num2">{ blockdetail.number }</span>    
                </div>
                <div className="naji_block_panel">
                    <span className="naji_block_panel_num1">Hash</span>
                    <span className="naji_block_panel_num2_hash" onClick={ e => copyHashToClipboard(blockdetail.hash) }>{ blockdetail.hash }</span>    
                </div>
                <div className="naji_block_panel">
                    <span className="naji_block_panel_num1">Miner</span>
                    <span className="naji_block_panel_num2_hash" onClick={ e => copyHashToClipboard(blockdetail.miner)}>{ blockdetail.miner }</span>    
                </div>
                <div className="naji_block_panel">
                    <span className="naji_block_panel_num1">Difficulty</span>
                    <span className="naji_block_panel_num2">{ blockdetail.difficulty }</span>    
                </div>
                <div className="naji_block_panel">
                    <span className="naji_block_panel_num1">Size</span>
                    <span className="naji_block_panel_num2">{ blockdetail.size }</span>    
                </div>
                <div className="naji_block_panel">
                    <span className="naji_block_panel_num1">Time</span>
                    <span className="naji_block_panel_num2">{ blockdetail.createdAt }</span>    
                </div>
                <div className="naji_block_panel">
                    <span className="naji_block_panel_num1">Transactions</span>
                    <span className="naji_block_panel_num2">
                        {tran_hash}
                     </span>
                </div>
            </section>
        </Fragment>
    )
}

Blockdetail.propTypes = {
    getBlockDetail: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    blockdetail: state.block.blockdetail,
  });
  
  export default connect(mapStateToProps, { getBlockDetail })(
    Blockdetail
  );
  