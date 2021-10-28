import React from "react";
import './Transaction.style.css'

const Transaction = ({ transactionDetails }) => {
  return <div className="transaction">
      <h4>{transactionDetails.transactionType === 'directDeposit' ? 'Direct Deposit' : (transactionDetails.transactionType === 'directWithdraw' ? 'Direct Withdraw' : 'Transfer Between Accounts')}</h4>
      <div>{<input style={{textAlign: 'end'}} type='datetime-local' disabled value={transactionDetails.createdAt.substring(0,transactionDetails.createdAt.length-5)}/>}</div>
      <div>Transaction amount: {transactionDetails.amount > 0 ? <span style={{color: transactionDetails.transactionType === 'directWithdraw' ? 'red' : 'green'}}>{transactionDetails.amount}</span> : <span style={{color: 'red'}}>{transactionDetails.amount}</span>}</div>
  </div>;
};
export default Transaction;
