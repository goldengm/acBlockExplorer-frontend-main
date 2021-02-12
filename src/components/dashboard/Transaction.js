import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Transaction = ({ transaction }) => {

  let transactions = '';

  if(Object.keys(transaction).length > 0){
    const now = new Date();
    transactions = transaction.map((tra) => {
      const date = new Date(tra.createdAt);
      let second = (now - date)/1000;
      let day = parseInt(second / 3600 / 24);
      let hour = parseInt(second / 3600) % 24;
      let minute = parseInt(second / 60) % 60;
      second = parseInt(second) % 60;

      let decimal = 0;
      let value = tra.value/1000000000000000000;
      const numStr = String(value);
      if (numStr.includes('.')) {
        decimal = numStr.split('.')[1].length;
      }
      
      return <tr className="naji-TableBodyRow_row" key={tra.txid}>
          <td className="naji-width-150"><Link to={`/tx/${tra.hash}`} className="naji_link"><span>{tra.hash.slice(0,5)}...{tra.hash.slice(tra.hash.length-5, tra.hash.length)}</span></Link></td>
          <td className="naji-width-50"><span>{tra.blockNumber}</span></td>
          <td className="naji-width-150"><Link to={`/address/${tra.from}`} className="naji_link"><span>{tra.from.slice(0,5)}...{tra.from.slice(tra.from.length-5, tra.from.length)}</span></Link></td>
          <td className="naji-width-150"><Link to={`/address/${tra.to}`} className="naji_link"><span>{tra.to.slice(0,5)}...{tra.to.slice(tra.to.length-5, tra.to.length)}</span></Link></td>
          <td className="naji-width-150"><span>{decimal>4?value.toFixed(4):value}</span></td>
          <td className="naji-width-150 "><span>{
            day ? day + (day == 1 ? " day " : " days ") + (hour ? hour + (hour == 1 ? " hr" : " hrs") : (minute ? minute + (minute == 1 ? " min" : " mins") : ""))
            : hour ? hour + (hour == 1 ? " hr " : " hrs ") + (minute ? minute + (minute == 1 ? " min" : " mins") : "")
            : minute ? minute + (minute == 1 ? " min " : " mins ") + (second ? second + " secs" : "")
            : second + " secs"
          } ago</span></td>
      </tr>
    });
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
                        <span className="naji-DividerWithTitle_title">Transactions</span>
                    </div>
                </div>                
                <div className="naji-Table">
                  <table>
                    <thead className="naji-TableHead_headContainer">
                      <tr>
                        <th className="naji-width-150">Hash</th>
                        <th className="naji-width-50">Block</th>
                        <th className="naji-width-150">From</th>
                        <th className="naji-width-150">To</th>
                        <th className="naji-width-150">Amount</th>
                        <th className="naji-width-150">Time</th>
                      </tr>
                    </thead>
                    <tbody className="naji-TableBody_bodyContainer">
                      {transactions.length ==0 ? <h3 style={{textAlign: "center", marginTop: "50px"}}>No Transactions found</h3> : transactions}
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

Transaction.propTypes = {
  transaction: PropTypes.array.isRequired,
};

export default connect(null)(Transaction);
