import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Header from './Header';
import GroceryList from "./GroceryList";

function Landing() {
  const [groceries, setGroceries] = useState([
  ])
  const [isPending, setIsPending] = useState(false)
  let user_id = localStorage.getItem("user_id")
  const firstname = localStorage.getItem("firstName")
  const lastname = localStorage.getItem("lastName")
  const bio = localStorage.getItem("bio")
  
  useEffect( (user_id) => {
    user_id = localStorage.getItem("user_id")
    axios.get(`http://localhost:4000/api/getitems/${user_id}`)
    .then(res => {
      setGroceries(res.data)
    })
    .catch( (err) => {
      console.log(err.response.data)
    })
  },[])

  const [input, setInput] = useState('')
  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    setIsPending(true)
    axios.post('http://localhost:4000/api/additem', {input, user_id})
    .then( (res) => {
      console.log(res)
      setGroceries(res.data)
      setIsPending(false)
    })
    .catch( (err) => {
      console.log(err.response.data)
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
      console.log(err.response.data)
    })
  }

  const groceriesMapped = groceries.map((groceryItem) => {
    return (
      <GroceryList item={groceryItem} handleDelete={handleDelete}/>

    )
  })

  return (
    <div className='landing'>
      <Header firstname={firstname} lastname={lastname} bio={bio} />
      <label> Groceries:
        <input type="text" onChange={handleInput} value={input} placeholder="item"/>
        <button onClick={handleSubmit}>Add</button>
      </label>
      {groceriesMapped}
      {isPending === true ? <li>Adding Item...</li> : <></>}
    </div>
  )
}

export default Landing
;
