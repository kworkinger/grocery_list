// import React, { useState } from 'react';

export default function GroceryList({groceries}) {
   
  return <div>
      <ul>
          {groceries.map((groceryItem) => (
              <li key={groceryItem.item_id}>{ groceryItem.item_names }</li>
          ))}
      </ul>
      </div>
}
