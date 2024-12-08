import { useState, useEffect } from 'react';

const PersonForm = ({ persons, setPersons, contactService, notify }) => {
  const [form, setForm] = useState({ name: null, number: null });

  const addContact = () => {
    const contact = {
      name: form.name,
      number: form.number,
    };
    contactService
      .create(contact)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact));
        notify(`${contact.name} has been added`);
      })
      .catch(error => {
        notify(error?.response.data.error, 'error');
      });
  };

  const updateContact = (contact, _id) => {
    if (
      window.confirm(
        `${form.name} is already added to phonebook replace the old number with a new one?`
      )
    ) {
      contactService
        .update(contact, _id)
        .then(updateResponse => {
          const personsUpdate = persons.map(person =>
            person._id !== updateResponse._id ? person : updateResponse
          );
          setPersons(personsUpdate);
          notify(`${contact.name} has been updated`);
        })
        .catch(error => {
          setPersons(persons.filter(person => person._id !== _id));
          notify(
            `Contact '${contact.name}' was already removed from server`,
            'error'
          );
        });
    }
  };

  const handleFormChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    setForm({ ...form, [name]: value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    const names = persons.map(person => person.name);
    if (names.includes(form.name)) {
      const toBeUpdated = persons.find(person => person.name === form.name);
      toBeUpdated.number = form.number;
      updateContact(toBeUpdated, toBeUpdated._id);
    } else {
      addContact();
    }
  };

  useEffect(() => {
    setForm({ name: '', number: '' });
  }, [persons]);

  return (
    <form onSubmit={handleFormSubmit} className='form-container'>
      <div>
        <label className='form-label'>Name:</label>
        <input
          name='name'
          value={form.name}
          onChange={handleFormChange}
          className='form-input'
        />
      </div>
      <div>
        <label className='form-label'>Number:</label>
        <input
          name='number'
          value={form.number}
          onChange={handleFormChange}
          className='form-input'
        />
      </div>
      <div>
        <button type='submit' className='form-button'>
          add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
