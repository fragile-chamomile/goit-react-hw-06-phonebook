import React from 'react';
import { useSelector } from 'react-redux';
import { List } from './ContactList.styled';
import ContactItem from '../ContactItem/ContactItem';

const ContactList = () => {
  const filterSelector = useSelector(state => state.contacts.filter);
  const contacts = useSelector(state => state.contacts.items);

  // Фильтрация списка контактов
  const getContactItem = () => {
    const normalizedFilter = filterSelector.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  getContactItem();

  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <ContactItem key={id} name={name} number={number} id={id} />
      ))}
    </List>
  );
};

export default ContactList;
