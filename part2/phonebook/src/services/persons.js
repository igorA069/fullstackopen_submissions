import axios from "axios"

const serverBaseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(serverBaseUrl).then(response => response.data)

const add = (newPerson) => axios.post(serverBaseUrl, newPerson).then(response => response.data)

const deletePerson = (id) => axios.delete(`${serverBaseUrl}/${id}`).then(response => response.data)

const updatePerson = (id, updatedPerson) => axios.put(`${serverBaseUrl}/${id}`, updatedPerson).then(response => response.data)

export default { getAll, add, deletePerson, updatePerson }
