import { List, Button } from 'antd';

const Contact = ({ person, deleteContact }) => {
  return (
    <List.Item
      style={{ alignItems: 'center' }}
      actions={[
        <Button
          type='primary'
          danger
          onClick={() => deleteContact(person)}
          key='delete'
        >
          Delete
        </Button>,
      ]}
    >
      {person.name} - {person.number}
    </List.Item>
  );
};

const Persons = ({ persons, contactService, setPersons }) => {
  const deleteContact = contact => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      console.log(`Deleting contact id: ${contact._id}`);
      contactService.remove(contact._id).then(() => {
        const personsUpdate = persons.filter(
          person => person._id !== contact._id
        );
        setPersons(personsUpdate);
      });
    }
  };

  return (
    <div className='filter-container'>
      <List
        bordered
        dataSource={persons}
        renderItem={person => (
          <Contact
            key={person._id}
            person={person}
            deleteContact={deleteContact}
          />
        )}
      />
    </div>
  );
};

export default Persons;
