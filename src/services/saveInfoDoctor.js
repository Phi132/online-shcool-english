import axios from "axios";
const saveInfoDoctor = (data) => {
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/save-info-doctor',data)
}


export { saveInfoDoctor };