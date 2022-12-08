import axios from 'axios';
const specialtyByID = (id) => {
    
    return axios.get(process.env.REACT_APP_BACKEND_URL + `/api/medical-specialty-by-id/${id}`)

}

export { specialtyByID };


