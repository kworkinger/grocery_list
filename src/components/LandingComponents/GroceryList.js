import React from 'react';

export default function GroceryList(props) {

        const groceryList = props.groceries.map((groceryItem) => (
            <li key={groceryItem.item_id}>{ groceryItem.item_names } <button onClick={() => props.handleDelete(groceryItem.item_id)}>Delete</button></li>
        ))
    
return <div>
      <ul>
          {groceryList}
      </ul>
      </div>
}
