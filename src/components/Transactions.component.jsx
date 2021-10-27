import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Transaction from "./Transaction.componernt";
export default function Transactions({ loggedInUser }) {
  const history = useHistory();
  const transactionsAPIURL = `https://6178efcbaa7f3400174045f4.mockapi.io/users/${loggedInUser.id}/transactions`;

  const [transactionsArray, setTransactionsArray] = useState([]);

  const pullTransactionsFromAPI = async () => {
    const apiResponse = await axios.get(transactionsAPIURL);
    console.log(apiResponse.data);
    setTransactionsArray(apiResponse.data);
  };

  useEffect(() => {
    console.log("loggedinuser=", loggedInUser);
    pullTransactionsFromAPI();
  }, []);

  if (!loggedInUser) history.push("/");
  return (
    <div className="transactionsContainer">
      <div>
        {transactionsArray.map((transaction) => {
          return <Transaction transactionDetails={transaction} />;
        })}
      </div>
    </div>
  );
}
