import axios from "axios";
const confirmAppointment = (token, doctorid) => {
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/verify-token-appointment', {token, doctorid})
}


export { confirmAppointment };