import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import './addTransaction.style.css'
import tooafraidtoask from '../img/tooafraidtoask.jpg'

const AddTransaction =()=>{
    const getAllUsersAPIURL = "https://6178efcbaa7f3400174045f4.mockapi.io/users/"
    const history=useHistory();
    const [loggedInUser] = useState(JSON.parse(localStorage.getItem("userLoggedIn")))
    const [currentLoggedInUserBalance, setCurrentLoggedInUserBalance] = useState(0)
    const [users,setUsers] = useState([])
    const [transactionObj, setObj] = useState({
        amount: 3,
        transactionType: '',
        toUser: loggedInUser ? (loggedInUser.id) : ''
    })
    useEffect( async () => { // eslint-disable-line
        if(loggedInUser) {
            const apiResponse = await axios.get(getAllUsersAPIURL)
            setUsers(apiResponse.data);
            const allTransactionsResponse = await axios.get(`https://6178efcbaa7f3400174045f4.mockapi.io/users/${loggedInUser.id}/transactions`)
            let sum = (allTransactionsResponse.data.length !==0 ? (allTransactionsResponse.data.reduce((sum,transaction)=>{ // eslint-disable-line
                if(transaction.transactionType === 'directWithdraw')
                    return sum-=transaction.amount
                if(transaction.transactionType === 'directDeposit')
                    return sum+=transaction.amount
                if(transaction.transactionType === 'transferToOtherUser' && transaction.fromUser === loggedInUser.id)
                    return sum+=transaction.amount
                if(transaction.transactionType === 'transferToOtherUser' && transaction.toUser === loggedInUser.id)
                    return sum+=transaction.amount
            }, 0) ) : 0)
            setCurrentLoggedInUserBalance(sum)
        }
    }, []) // eslint-disable-line

    const handleOnChange = (e) => {
        e.target.style.border = '';
        if(e.target.name === 'amount')
            e.target.value = e.target.value.replace(/[^\d]/gi, '')
        setObj(prevState => (
            {...prevState, [e.target.name]: (e.target.name==='amount'? (parseInt(e.target.value)):(e.target.value))} //contains special handling of the amount field, since it needs to be int
        ))
    }

    const findIfUserIsActive = (idOfWhoToCheck) => {
        let userToCheck = users.find(user=>{
            if(user.id===idOfWhoToCheck)
                return true;
            return false;
        })
        return userToCheck.inActiveAccount;
    }
    const onFormSubmit = async (e)=>{
        e.preventDefault();
        let isGoodToGo = true;

        Object.entries(transactionObj).forEach((item,index) => { //go over all the keys in the state object, check if any of them is empty
            if(item[1].length === 0){
                e.target[index].style.border = '1px solid red'
                isGoodToGo = false; //if empty, set isGoodToGo to false, to prevent the api call from having empty values
            }
        })
        if(isGoodToGo) {
            if(!findIfUserIsActive(transactionObj.toUser)){
                if(transactionObj.transactionType === `transferToOtherUser`){
                    if((currentLoggedInUserBalance + loggedInUser.allowance) > transactionObj.amount) {
                        let temp = {...transactionObj};
                        let temp2 = temp
                        temp['fromUser']=loggedInUser.id;
                        const apiResponse = await axios.post(`https://6178efcbaa7f3400174045f4.mockapi.io/users/${temp.toUser}/transactions`, temp)
                        if(apiResponse.status === 201){
                            temp2['toUser']=loggedInUser.id
                            temp2['amount']=temp2.amount*-1;
                            const apiResponse2 = await axios.post(`https://6178efcbaa7f3400174045f4.mockapi.io/users/${loggedInUser.id}/transactions`, temp2) // eslint-disable-line
                            e.target.reset()
                            e.target[1].value = -1;
                            alert('transaction done')
                            history.push("/")
                        }
                        else{
                            console.log('failed',apiResponse);
                        }
                    }
                    else{
                        alert('Error occured while attempting transaction')
                    }
                }
                else { //the direct withdraw/deposit
                    if(transactionObj.transactionType === `directWithdraw`){
                        if((currentLoggedInUserBalance + loggedInUser.allowance) > transactionObj.amount){
                            const apiResponse = await axios.post(`https://6178efcbaa7f3400174045f4.mockapi.io/users/${loggedInUser.id}/transactions`, transactionObj)
                            if(apiResponse.status === 201){
                                e.target.reset()
                                e.target[1].value = -1;
                                alert('transaction done')
                                history.push("/")
                            }
                            else{
                                console.log('failed',apiResponse);
                            }
                        }
                        else{
                            alert('Error occured while attempting transaction')
                        }
                    }
                    else { //directDeposit
                        const apiResponse = await axios.post(`https://6178efcbaa7f3400174045f4.mockapi.io/users/${loggedInUser.id}/transactions`, transactionObj)
                        if(apiResponse.status === 201){
                            e.target.reset()
                            e.target[1].value = -1;
                            alert('transaction done')
                            history.push("/")
                        }
                        else{
                            console.log('failed',apiResponse);
                        }
                    }
                }
            }
            else{
                alert(`Recipient's account is not active`)
            }
        }
    }

    if(!loggedInUser)
        history.push("/");
    return (
        (loggedInUser && loggedInUser.inActiveAccount) ? <>You are not allowed to make transactions</> :
        <div className="addTransaction">
            <div>Your current balance is: {currentLoggedInUserBalance >= 0 ? <span style={{color: 'green'}}>{currentLoggedInUserBalance}</span> : <span style={{color: 'red'}}>{currentLoggedInUserBalance}</span>}</div>
            <form id='addTransactionForm' onSubmit={onFormSubmit}>
            <input type="text" name="amount" placeholder={"Choose your transaction amount"} onChange={handleOnChange} />
            <select name="transactionType" onChange={handleOnChange} >
                <option value={-1} disabled selected>Choose Operation</option>
                <option value={'directWithdraw'}>Withdraw</option>
                <option value={'directDeposit'}>Deposit</option>
                <option value={'transferToOtherUser'}>Transfer to someone</option>
            </select>
            
            { transactionObj.transactionType === 'transferToOtherUser' ? 
                (<><select name="toUser" onChange={handleOnChange}>
                <option value={-1} disabled selected>Choose recipient</option>
                {users.map(user => {
                    if(user.id === loggedInUser.id)
                        return <option disabled key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}-ID=${user.id}`}</option> //dont give ability to transfer to myself
                    return <option key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}-ID=${user.id}`}</option>
                })} 
                </select></>)
                : ('')
            }

            <input type="submit"/>
            </form>
            <img src={tooafraidtoask} alt='test'/>
        </div>
    )
}

export default AddTransaction;