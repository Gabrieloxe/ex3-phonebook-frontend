import axios from 'axios';
const baseURL = '/api/persons'


const getAll = () =>{
    const request = axios.get(baseURL);
    return request.then(response => response.data);
}

const create = (contact) =>{
    const request = axios.post(baseURL,contact);
    return request.then(response => response.data);
}

const update = (contact, _id) =>{
    const request = axios.put( `${baseURL}/${_id}` , contact)
    return request.then(response => response.data);
}

const remove = (_id) =>{
    const request = axios.delete( `${baseURL}/${_id}`)
    return request.then(response => response.data);
}

const contactService = {
    getAll,
    create,
    update,
    remove
}

export default contactService;
