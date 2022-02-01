import axios from 'axios';
import React, { useState, useEffect } from 'react';
import GroceryList from "./GroceryList";


function Landing(props) {
  const [groceries, setGroceries] = useState([
  ])
    const user_id = localStorage.getItem("user_id")
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
    <div>
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
