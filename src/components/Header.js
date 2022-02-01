import React from 'react';



export default function Header(props) {
  return <div>
      <div className="header">
      <h1 className='heading'>{props.firstname}'s Groceries</h1>
      </div>
      <div className="user">
      <h2>{props.firstname} {props.lastname}</h2>
      </div>

  </div>
}
