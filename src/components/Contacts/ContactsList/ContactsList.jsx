import React from "react";

export const ContactsList = ({contacts, onChangeDelete}) => {
 return(<ul>
  {contacts.map(({id, name, phone, createdAt }) => (
    <li key={id}>
    <p>Name: {name}</p>
    <p>Phone: {phone}</p>
    <p>Created At: {createdAt}</p>
    <button id={id.toString()} onClick={onChangeDelete}>Delete</button>
  </li>
  ))}
   </ul>) 
}