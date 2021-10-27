import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Transaction from "./Transaction.component";

export default function Transactions() {
  const history = useHistory();

  const [loggedInUser] = useState(JSON.parse(localStorage.getItem("userLoggedIn")))
  let transactionsAPIURL;
  if(loggedInUser)
    transactionsAPIURL = `https://6178efcbaa7f3400174045f4.mockapi.io/users/${loggedInUser.id}/transactions`;

  const [transactionsArray, setTransactionsArray] = useState([]);

  const pullTransactionsFromAPI = async () => {
    if(loggedInUser) {
      const apiResponse = await axios.get(transactionsAPIURL);
      console.log(apiResponse.data);
      setTransactionsArray(apiResponse.data);
    }
  }

  useEffect(() => {
    if(loggedInUser)
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
