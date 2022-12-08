import axios from 'axios';
const getAllConsultant = () => {

    return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/all-data-remote-consultant')

}

export { getAllConsultant };


