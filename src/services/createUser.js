import axios from "axios";
const createUser = (dataUser) => {
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/create-data',  dataUser )
}


export { createUser };