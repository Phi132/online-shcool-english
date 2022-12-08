import axios from "axios";
const submitPatientInfo = (data) => {
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/submit-info-patient',data)
}


export { submitPatientInfo };