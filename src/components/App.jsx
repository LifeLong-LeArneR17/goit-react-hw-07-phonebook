import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setFilter, setName, setNumber } from "redux/contactsSlice.js";
import { nanoid } from "nanoid";
import { Filter } from "./Filter/Filter";
import { ContactsList } from "./Contacts/ContactsList/ContactsList";
import { contactsFromStore, filterFromStore, nameFromStore, numberFromStore } from "../redux/selector"
import { fetchContacts, addContact, deleteContact } from "redux/operations";

export function  App () {
  const dispatch = useDispatch();
  const contacts = useSelector(contactsFromStore);
  const filter = useSelector(filterFromStore);
  const name = useSelector(nameFromStore);
  const phone = useSelector(numberFromStore);
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name':
        dispatch(setName(value));
        break;
      case 'phone':
        dispatch(setNumber(value));
        break;
      default:
        break;
    }
  };
  
  
  

const handleSubmit = evt => {
    evt.preventDefault();
  
  
      const isDuplicate = contacts.some(contact => contact.name === name);
      if(isDuplicate) {
      alert(`Contact with name "${name}" already exists!`);
      return; // Прерываем выполнение функции
    }
     const NewContact = {
        // Создаем объект контакта
      id: nanoid(),
      name: name,
      phone: phone,
     };
  
    dispatch(addContact(NewContact))
     dispatch(setName(''));
     dispatch(setNumber(''))
  }

const handleChangeFilter = evt => {
     dispatch(setFilter(evt.target.value));
 }

 const onChangeDelete = evt => {
    const contactId = evt.target.id;
  dispatch(deleteContact(contactId))
  }





const FilterContacts = contacts.filter(contact =>
  contact.name.toLowerCase().trim().includes(filter?.toLowerCase() || '')
);
    
useEffect(() => {
  dispatch(fetchContacts())
}, [])





    return (
      <>
      <form onSubmit={handleSubmit}>
      <h2>Name</h2>
      <input
  type="text"
  name= "name"
  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
  title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  required
  value={name}
  onChange={handleChange}
/>
<h2>Number</h2>
<input
  type="tel"
  name="phone"
  pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
  title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
  required
  value={phone}
  onChange={handleChange}
/>
<button type="submit" >Add contact</button>
<h2>Contacts</h2>
    <Filter onChange={handleChangeFilter} filter={filter}/>
    <ContactsList contacts={FilterContacts} onChangeDelete={onChangeDelete}/>

    </form>
      </>
    );
  }


export default App;



