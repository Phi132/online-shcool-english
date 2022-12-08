import axios from "axios";
const editUser = (data) => {
    return axios.put(process.env.REACT_APP_BACKEND_URL + '/api/updateDataUser', data)
}


export { editUser };