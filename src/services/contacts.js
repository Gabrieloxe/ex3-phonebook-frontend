import axios from 'axios';
const baseURL = '/api/persons';

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async contact => {
  const response = await axios.post(baseURL, contact);
  return response.data;
};

const update = async (contact, _id) => {
  const response = await axios.put(`${baseURL}/${_id}`, contact);
  return response.data;
};

const remove = async _id => {
  const response = await axios.delete(`${baseURL}/${_id}`);
  return response.data;
};

const contactService = {
  getAll,
  create,
  update,
  remove,
};

export default contactService;
