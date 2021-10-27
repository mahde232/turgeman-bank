import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Login.style.css'

const loginAPIURL = 'https://6178efcbaa7f3400174045f4.mockapi.io/users/?username='

export default function Login() {

    const [userObj,setObj] = useState({
        username: '',
        password: ''
    })
    const [loggedIn, setLoggedIn] = useState({})

    useEffect(() => {
        console.log(loggedIn);
        //send logged in user back to father
    }, [loggedIn])

    const handleOnChange = (e) => {
        e.target.style.border = '';
        setObj(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const onFormSubmit = async (e) => {
        e.preventDefault(); //prevent default form submitting
        console.log(`click`);
        let isGoodToGo = true;

        Object.entries(userObj).forEach((item,index) => { //go over all the keys in the state object, check if any of them is empty
            if(item[1].length === 0){
                console.log(`${e.target[index].name} cannot be empty`);
                e.target[index].style.border = '1px solid red'
                isGoodToGo = false; //if empty, set isGoodToGo to false, to prevent the api call from having empty values
            }
        })
        if(isGoodToGo) { //if all values are set, everything is good to go.
            //show loader
            const apiResponse = await axios.get(`${loginAPIURL}${userObj.username}`)
            //remove loader
            if(apiResponse.status===200) { //grabbed users succesfully
                console.log('success',apiResponse);
                if(apiResponse.data[0].username.toLowerCase()===userObj.username.toLowerCase() && apiResponse.data[0].password===userObj.password) {
                    console.log('username and password are correct');
                    setLoggedIn(apiResponse.data[0])
                }
                else {
                    console.log('invalid username or password');
                    //add/display div that gives feedback that password or username are wrong.
                }
                e.target.reset()
                //add/display div that gives feedback that user successfully logged in.
            }
            else {
                console.log('failed',apiResponse);
                //add/display div that gives feedback that something went wrong.
            }
        }
    }
    return (
        <div className='loginContainer'>
            <h3>Login</h3>
            <form id={'loginForm'} onSubmit={onFormSubmit}>
                <div> <input type='text' name={'username'} placeholder='Username' onChange={handleOnChange}/> </div>
                <div> <input type='password' name={'password'} autoComplete="new-password" placeholder='Password' onChange={handleOnChange}/> </div>
                <div> <input type='submit' value='Login' /> </div>
            </form>
        </div>
    )
}
