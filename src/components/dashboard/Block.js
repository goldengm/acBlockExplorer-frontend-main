import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import copy from 'copy-text-to-clipboard';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Block = ({ block }) => {

  toast.configure();
  const copyHashToClipboard = (hash) => {
     console.log(hash);
     copy(hash);
     toast("Copid!");
   };

   let blocks = '';
   let blocks_temp = [];


  if(Object.keys(block).length > 0 && Object.keys(block[0]).length > 0){
    blocks = block.map((blo) => (
      <div className="naji-TableBodyRow_row" key={blo.height}>
          <div className="naji-width-100"><Link to={`/block/${blo.number}`} className="naji_link"><span>{blo.number}</span></Link></div>
          <div className="naji-width-200">
              <div className="naji-LocalizedLink_link" onClick={e => copyHashToClipboard(blo.hash)}>{blo.hash.slice(1, 5)}...{blo.hash.slice(blo.hash.length - 5, blo.hash.length)}</div>
          </div>
          <div className="naji-width-100 "><span>{blo.difficulty}</span></div>
          <div className="naji-width-100"><span>{blo.size}</span></div>
          <div className="naji-width-100"><span>{blo.timestamp}</span></div>
          <div className="naji-width-200"><span>{blo.miner.slice(1, 5)}...{blo.miner.slice(blo.miner.length - 5, blo.miner.length)}</span></div>
  
      </div>
    ));
  }
  

  return (
    <Fragment>
      <div className="naji-LandingPage_epochList">
        <div className="naji-EpochList_epochListContainer">
            <div className="naji-Table_tableContainer">
                <div className="naji-Table_title">
                    <div className="naji-DividerWithTitle_dividerContainer">
                        <div className="naji-DividerWithTitle_line">
    
                        </div>
                        <span className="naji-DividerWithTitle_title">Latest Blocks</span>
                    </div>
                </div>
                <div className="naji-Table">
                  <table>
                    <thead className="naji-TableHead_headContainer">
                      <tr>
                        <th className="naji-width-100">Number</th>
                        <th className="naji-width-200">Hash</th>
                        <th className="naji-width-100">Difficulty</th>
                        <th className="naji-width-100">Size</th>
                        <th className="naji-width-100">Timestamp</th>
                        <th className="naji-width-200">Miner</th>
                      </tr>
                    </thead>
                    <tbody className="naji-TableBody_bodyContainer">
                      {blocks}
                    </tbody>
                  </table>
                </div>
            </div>
        </div>
        {/* <div className="naji-ShowMoreButtonDecorator_root">
            <a className="naji-LocalizedLink_link" href="#">
                <span className="naji-ShowMoreButtonDecorator_showMoreButton">show more</span>
            </a>
        </div> */}
      </div>
    </Fragment>
  );
};

Block.propTypes = {
  block: PropTypes.array.isRequired,
};

export default connect(null)(Block);
