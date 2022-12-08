import axios from 'axios';
const getAllSpecialty = () => {
    
    return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/all-data-medical-specialty')

}

export { getAllSpecialty };


