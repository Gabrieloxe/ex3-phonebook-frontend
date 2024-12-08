const Contact = ({ person, deleteContact }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={() => deleteContact(person)}>Delete</button>
    </li>
  );
};

const Persons = ({ persons, contactService, setPersons }) => {
  const deleteContact = contact => {
    if (window.confirm(`Delete ${contact.name}? `)) {
      console.log(`deleting note id: ${contact._id}`);
      contactService.remove(contact._id).then(deletionResponse => {
        const personsUpdate = persons.filter(
          person => person._id !== contact._id
        );
        setPersons(personsUpdate);
      });
    }
  };

  return (
    <div className='filter-container'>
      <ul>
        {persons.map(person => (
          <Contact
            key={person.name}
            person={person}
            deleteContact={deleteContact}
          />
        ))}
      </ul>
    </div>
  );
};

export default Persons;
