import axios from 'axios';
const doctorIdBySpecialtyID = (id) => {
    
    return axios.get(process.env.REACT_APP_BACKEND_URL + `/api/doctorInfo-by-specialtyId?id=${id}`)

}

export { doctorIdBySpecialtyID };


