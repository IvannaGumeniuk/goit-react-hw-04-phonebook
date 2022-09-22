import { useState, useEffect } from "react";
import styles from "./App.module.css";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

const contactList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem('contacts')) ?? contactList);
  
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmit = newContact => {
    setContacts([...contacts, newContact]);
  };

  const checkNewContact = newContact => {
    if (contacts.find(contact =>
      contact.name.toLocaleLowerCase() === newContact.name.toLocaleLowerCase()
      )
    )
    { alert(newContact.name + ' is alredy in contacts');
      return true;
    }
      return false;
  };
  
  const onChangeFilter = e => {
    setFilter(e.target.value );
  };
  
  const deleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };
  
  const normalizeFilter = filter.toLocaleLowerCase();
  const visibleName = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(normalizeFilter),
    );

  return (
    <div className={styles.container}>
      <h1>Phonebook</h1>
        <ContactForm
          onSubmit={onSubmit}
        checkNewContact={checkNewContact} />
      
      <h2>Contacts</h2>

        <Filter
          filter={filter}
          onChange={onChangeFilter}
        />
      
        <ContactList
          visibleName={visibleName}
          deleteContact={deleteContact}
        />
    </div>
  );
}