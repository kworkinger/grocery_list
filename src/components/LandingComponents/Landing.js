import axios from 'axios';
import React, { useState } from 'react';
import GroceryList from "./GroceryList";


function Landing() {
  const [groceries, setGroceries] = useState([
    {
     item_id: 1,
     item_names: "Spaghetti",
     user_id: 1,
    },
    {
     item_id: 2,
     item_names: "Pizza",
     user_id: 1,
    },
    {
     item_id: 3,
     item_names: "Sushi",
     user_id: 1,
    },
    {
     item_id: 4,
     item_names: "Tacos",
     user_id: 1,
    },
    {
     item_id: 5,
     item_names: "Burritos",
     user_id: 1,
    }
    ]);
    

  const [input, setInput] = useState('')
  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    axios.post('http://localhost:4000/api/additem', {input, user_id: 1})
    .then( (res) => {
      console.log(res)
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
      <GroceryList groceries={groceries} />
    </div>
  )
}

export default Landing
;
