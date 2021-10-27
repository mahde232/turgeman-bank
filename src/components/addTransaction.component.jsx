import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'

const AddTransaction =()=>{
    const getAllUsersAPIURL = "https://6178efcbaa7f3400174045f4.mockapi.io/users/"
    const history=useHistory();
    const [loggedInUser] = useState(JSON.parse(localStorage.getItem("userLoggedIn")))
    const [currentLoggedInUserBalance, setCurrentLoggedInUserBalance] = useState(0)
    const [users,setUsers] = useState([])
    const [transactionObj, setObj] = useState({
        amount: '',
        transactionType: '',
        toUser: loggedInUser ? (loggedInUser.id) : ''
    })
    useEffect(() => {
        console.log(transactionObj);
    }, [transactionObj])
    useEffect( async () => {
        if(loggedInUser) {
            const apiResponse = await axios.get(getAllUsersAPIURL)
            setUsers(apiResponse.data);
            const allTransactionsResponse = await axios.get(`https://6178efcbaa7f3400174045f4.mockapi.io/users/${loggedInUser.id}/transactions`)
            console.log('alltransactions=',allTransactionsResponse);
            let sum = (allTransactionsResponse.data.length !==0 ? (allTransactionsResponse.data.reduce((sum,transaction)=>{
                if(transaction.transactionType === 'directWithdraw')
                    return sum-=transaction.amount
                if(transaction.transactionType === 'directDeposit')
                    return sum+=transaction.amount
                if(transaction.transactionType === 'transferToOtherUser' && transaction.fromUser === loggedInUser.id)
                    return sum-=transaction.amount
                if(transaction.transactionType === 'transferToOtherUser' && transaction.toUser === loggedInUser.id)
                    return sum+=transaction.amount
            }, 0) ) : 0)
            setCurrentLoggedInUserBalance(sum)
        }
    }, [])

    const handleOnChange = (e) => {
        console.log(`${e.target.name} = ${e.target.value}`);
        e.target.style.border = '';
        setObj(prevState => (
            {...prevState, [e.target.name]: (e.target.name==='amount'? (parseInt(e.target.value)):(e.target.value))} //contains special handling of the amount field, since it needs to be int
        ))
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
            if(transactionObj.transactionType === `transferToOtherUser`){
                if((currentLoggedInUserBalance + loggedInUser.allowance) > transactionObj.amount) {
                    setObj(prevState => ({...prevState, ["fromUser"]: loggedInUser.id }))
                    const apiResponse = await axios.post(`https://6178efcbaa7f3400174045f4.mockapi.io/users/${transactionObj.toUser}/transactions`, transactionObj)
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
                    alert('not enough balance')
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
                        alert('not enough balance')
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
    }

    if(!loggedInUser)
        history.push("/");
    return (
        <div className="addTransaction">
            <div>Your current balance is: {currentLoggedInUserBalance}</div>
            <form onSubmit={onFormSubmit}>
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

        </div>
    )
}

export default AddTransaction;