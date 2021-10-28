import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Transaction from "./Transaction.component";
import './Transactions.style.css'
import RobBank from '../img/RobABank.jpg'

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
      apiResponse.data.sort((a,b) => a.createdAt.localeCompare(b.createdAt)) //sort transactions by date
      setTransactionsArray(apiResponse.data);
    }
  }

  useEffect(() => {
    if(loggedInUser)
      pullTransactionsFromAPI();
  }, []); // eslint-disable-line

  if (!loggedInUser) history.push("/");
  return ( <>
    <div className="transactionsContainer">
        {transactionsArray.length !== 0 ? transactionsArray.map((transaction) => {
          return <Transaction transactionDetails={transaction} />;
        }) : <>There are no transactions in your account.</>
        }
    </div>
    <div><img style={{marginTop:'2vh'}} src={RobBank} alt='test'/></div>
    </>
  );
}
