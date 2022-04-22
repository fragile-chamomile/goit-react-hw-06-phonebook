import { useState } from 'react';
import { Container, HeroTitle } from './App.styled';
import { nanoid } from 'nanoid';
import { RiContactsBookLine } from 'react-icons/ri';

import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  // Добавление контакта, проверка на повторение имени
  const addContactItem = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const dublicateName = contacts.find(contact => {
      return contact.name.toLowerCase() === name.toLowerCase();
    });

    if (dublicateName) {
      return alert(`${name} is already in contacts.`);
    }

    setContacts(contacts => [...contacts, contact]);
  };

  // Удаление контакта
  const deleteContactItem = ContactItemId => {
    setContacts(contacts.filter(contact => contact.id !== ContactItemId));
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  // Фильтрация списка контактов
  const getContactItem = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <Container>
      <HeroTitle>
        Phonebook <RiContactsBookLine />
      </HeroTitle>
      <ContactForm onSubmit={addContactItem} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getContactItem()}
        onDeleteContactlist={deleteContactItem}
      />
    </Container>
  );
}

export default App;
