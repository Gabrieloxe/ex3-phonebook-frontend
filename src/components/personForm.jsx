import { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';

const PersonForm = ({ persons, setPersons, contactService, notify }) => {
  const [form] = Form.useForm();

  const addContact = values => {
    const contact = {
      name: values.name,
      number: values.number,
    };
    contactService
      .create(contact)
      .then(returnedContact => {
        setPersons(persons.concat(returnedContact));
        notify(`${contact.name} has been added`);
        form.resetFields();
      })
      .catch(error => {
        notify(error?.response.data.error, 'error');
      });
  };

  const updateContact = (contact, _id) => {
    if (
      window.confirm(
        `${contact.name} is already added to phonebook. Replace the old number with a new one?`
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
          form.resetFields();
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

  const handleFormSubmit = values => {
    const names = persons.map(person => person.name);
    if (names.includes(values.name)) {
      const toBeUpdated = persons.find(person => person.name === values.name);
      toBeUpdated.number = values.number;
      updateContact(toBeUpdated, toBeUpdated._id);
    } else {
      addContact(values);
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleFormSubmit}
      layout='vertical'
      className='form-container'
    >
      <Form.Item
        label='Name'
        name='name'
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input placeholder='Enter name' />
      </Form.Item>
      <Form.Item
        label='Number'
        name='number'
        rules={[{ required: true, message: 'Please input the number!' }]}
      >
        <Input placeholder='Enter number' />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonForm;
