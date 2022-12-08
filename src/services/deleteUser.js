import axios from "axios";
const deleteUser = (id) => {
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/deleteUser', {id})
}


export { deleteUser };