import axios from 'axios';
const patientLogin = (email, password) => {
    
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/login-user', {email,password})

}

export { patientLogin };


