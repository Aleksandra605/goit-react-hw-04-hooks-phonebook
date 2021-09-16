import './App.css';
import { useState } from 'react';
import Form from './Components/form/Form';
import Filter from './Components/filter/Filter';
import ContactList from './Components/contacts-list/ContactList';
import PropTypes from 'prop-types';
import useLocalStorage from './hooks/useLocalStorage';

const deafultContactList = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export default function App() {
  const [filtered, setFilter] = useState('');
  const [contacts, setContacts] = useLocalStorage(
    'contacts',
    deafultContactList,
  );

  const formSubmitHandler = data => {
    let similar = contacts.find(obj => obj.name === data.name);

    similar !== undefined
      ? alert(`${data.name} is already in contacts.`)
      : setContacts([...contacts, data]);
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    console.log(contacts);

    const normalizedFilter = filtered.toLocaleLowerCase();

    const filteredNames = contacts.filter(item =>
      item.name.toLocaleLowerCase().includes(normalizedFilter),
    );

    return filteredNames;
  };

  const deleteContact = id => {
    setContacts(state => {
      return state.filter(el => el.id !== id);
    });
  };

  return (
    <div>
      <Form onSubmit={formSubmitHandler} />
      <Filter value={filtered} onChange={changeFilter} />
      {filtered !== '' ? (
        <ContactList
          contacts={getFilteredContacts()}
          onDelete={deleteContact}
        />
      ) : (
        <ContactList contacts={contacts} onDelete={deleteContact} />
      )}
    </div>
  );
}

App.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};
