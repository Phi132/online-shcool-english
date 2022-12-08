import axios from "axios";
const getDetailAppointment = (date, id) => {
    return axios.get(process.env.REACT_APP_BACKEND_URL + `/api/get-appointment-doctor?date=${date}&id=${id}`)
}


export { getDetailAppointment };