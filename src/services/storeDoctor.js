import axios from "axios";
const storeDoctor = (data) => {
    return axios.put(process.env.REACT_APP_BACKEND_URL + '/api/store-info-doctor', data)
}


export { storeDoctor };