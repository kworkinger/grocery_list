import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import GroceryList from "./GroceryList";


function Landing() {
  const [groceries, setGroceries] = useState([
  ])
    const user_id = localStorage.getItem("user_id")
    const firstname = localStorage.getItem("firstName")
    const lastname = localStorage.getItem("lastName")

  useEffect( () => {
    axios.get(`http://localhost:4000/api/getitems/${user_id}`)
    .then(res => {
      console.log(res)
      setGroceries(res.data)
    })
    .catch( (err) => {
      console.log(err.message)
    })
  },[])

  const [input, setInput] = useState('')
  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    axios.post('http://localhost:4000/api/additem', {input, user_id})
    .then( (res) => {
      console.log(res)
      setGroceries(res.data)
    })
    .catch( (err) => {
      console.log(err.message)
    })

  }
  
  const handleDelete = (item_id) => {
    console.log("handleDelete fired")
    const obj = { item_id, user_id }
    axios.delete('http://localhost:4000/api/delete', {data: obj} )
    .then(res => {
      console.log(res.data)
      setGroceries(res.data)
    })
    .catch( (err) => {
      console.log(err.message)
    })
  }

  return (
    <div className='landing'>
      <Header firstname={firstname} lastname={lastname} />
      <label> Groceries:
        <input type="text" onChange={handleInput} value={input} placeholder="item"/>
        <button onClick={handleSubmit}>Add</button>
      </label>
      <GroceryList groceries={groceries} handleDelete={handleDelete} />
    </div>
  )
}

export default Landing
;
