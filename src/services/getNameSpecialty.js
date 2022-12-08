import axios from 'axios';
const getNameSpecialty = () => {

    return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/get-all-specialty')

}

export { getNameSpecialty };


