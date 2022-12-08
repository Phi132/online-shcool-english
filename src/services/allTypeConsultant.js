import axios from "axios";
const allTypeConsultant = () => {
    return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/get-all-type-consultant');
}


export { allTypeConsultant };