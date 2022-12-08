import axios from 'axios';
const sendEmailToPatient = (data) => {
    
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/send-email-to-patient', data);

}

export { sendEmailToPatient };


