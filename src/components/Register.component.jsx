import React, { useState, useEffect } from 'react'
import axios from 'axios'

const countriesAPIURL = 'https://restcountries.com/v3.1/all';
const registerAPIURL = 'https://6178efcbaa7f3400174045f4.mockapi.io/users'

export default function Register() {
    const [countries, setCountries] = useState(null) //for countries select

    const [userObj, setObj] = useState({
        firstName: '',
        lastName: '',
        country: '',
        username: '',
        password: '',
        allowance: 0,
        userType: 1
    })

    useEffect(() => {
        getCountriesFromAPI()
    }, [])

    const getCountriesFromAPI = async () => {
        //show loader
        const apiResponse = await axios.get(countriesAPIURL);
        //remove loader
        if(apiResponse.status === 200)
        {
            const cleanCountriesData = apiResponse.data.map(countryDetails => {
                return { name: countryDetails.name.common }
            })
            cleanCountriesData.sort((a,b) => {return a.name.localeCompare(b.name)}) //Sort lexicographically
            setCountries(cleanCountriesData);
            console.log('fetched countries');
        }
        else {
            console.log(`axios had a problem, status code=${apiResponse.status}`);
        }
    }
    const handleOnChange = (e) => {
        e.target.style.border = '';
        setObj(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const onFormSubmit = async (e) => {
        e.preventDefault(); //prevent default form submitting
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
            const apiResponse = await axios.post(registerAPIURL, userObj)
            //remove loader
            if(apiResponse.status===201 || apiResponse.status===200) { //added succesfully
                console.log('success',apiResponse);
                e.target.reset()
                e.target[2].value = -1;
                //add/display div that gives feedback that user successfully registered.
            }
            else {
                console.log('failed',apiResponse);
                //add/display div that gives feedback that something went wrong.
            }
        }
    }

    return (
        <div className='registerContainer'>
            <h3>Register</h3>
            <form id={'registerForm'} autoComplete='new-password' onSubmit={onFormSubmit}>
                <div className='nameInputs'>
                    <input type='text' name={'firstName'} placeholder='First name' onChange={handleOnChange}/>
                    <input type='text' name={'lastName'} placeholder='Last name' onChange={handleOnChange}/>
                </div>
                <div>
                {
                    countries ? <select form={'registerForm'} name={'country'} onChange={handleOnChange}>
                        <option key={-1} value={-1} disabled selected>Select Country</option>
                        {countries.map((item,index) => {
                        return <option key={index} value={item.name}>{item.name}</option>
                    })}</select> 
                    : <></>
                }
                </div>
                <input type='text' name={'username'} placeholder='Username' onChange={handleOnChange}/>
                <input type='password' name={'password'} autoComplete="new-password" placeholder='Password' onChange={handleOnChange}/>
                <div>
                    <input type='submit' />
                </div>
            </form>
        </div>
    )
}
