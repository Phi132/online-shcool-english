import axios from "axios";
const saveSchedule = (data) => {
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/save-schedule-appointment', data)
}


export { saveSchedule };