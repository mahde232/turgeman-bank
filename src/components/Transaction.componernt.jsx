import React from "react";

const Transaction = ({ transactionDetails }) => {
  return <div className="transaction">
      <h3>{transactionDetails.transactionType}</h3>
      <div>{transactionDetails.createdAt}</div>
      <div><span>{transactionDetails.amount}</span></div>
  </div>;
};
export default Transaction;
