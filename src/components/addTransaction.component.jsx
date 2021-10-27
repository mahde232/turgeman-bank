import React from 'react'



const AddTransaction =()=>{
    const onFormSubmit =()=>{
    }
    return (
        <div className="addTransaction">
            <form onSubmit={onFormSubmit}>

            <input type="number" placeholder={"amount"} />
            <select name="" id=""></select>
            </form>

        </div>
    )
}