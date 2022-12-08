import axios from 'axios';
const getDataFromServer = () => {
    
    return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/get-data')

}

export { getDataFromServer };


