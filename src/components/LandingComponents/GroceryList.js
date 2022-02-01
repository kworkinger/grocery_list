import React from 'react';

export default function GroceryList(props) {

    return (

        <li key={props.item.item_id}> 
        {props.item.item_names}
            <button onClick={() => props.handleDelete(props.item.item_id)}>Delete</button>
        </li>
  )
}