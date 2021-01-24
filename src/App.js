import { useState, useEffect } from "react";
import Section from "./components/Section/Section.js";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setContact,
  deleteContact,
  addContact,
  setFilter,
} from "./redux/contacts/contactsAction";
import { getContacts, getFilter } from "./redux/contacts/contactsSelectors";

function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const addContacts = (contact) => dispatch(addContact(contact));
  const contactDelete = (id) => dispatch(deleteContact(id));
  const setContacts = (contactsArr) => dispatch(setContact(contactsArr));
  const setFilterApp = (data) => dispatch(setFilter(data));

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("contacts"))) {
      localStorage.setItem("contacts", "[]");
      return;
    }
    setContacts(JSON.parse(localStorage.getItem("contacts")));
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const changeHandler = (e) => {
    setFilterApp(e.target.value);
  };

  const deleteContactbyId = (id) => {
    contactDelete(id);
    // const updatedContacts = getContacts.filter((contact) => contact.id !== id);
    // setContacts([...updatedContacts]);
  };

  const addContactApp = (contact) => {
    console.log(contact);
    const newName = contact.name;
    const names = contacts.map((contact) => contact.name.toLowerCase());
    if (names.includes(newName.toLowerCase().trim())) {
      alert(`${newName} is already in contact list`);
      return;
    }
    addContacts(contact);
  };

  const filterContactsByName = () => {
    if (contacts.length) {
      return contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm addContact={addContactApp} />
      </Section>
      <Section title="Contacts">
        <Filter onChange={changeHandler} />
        {/* {contacts.length > 1 && <Filter onChange={changeHandler} />} */}
        <ContactList
          contacts={filterContactsByName()}
          onDelete={deleteContactbyId}
        />
      </Section>
    </>
  );
}

export default App;
