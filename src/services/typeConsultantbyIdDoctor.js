import axios from 'axios';
const typeConsultantbyIdDoctor = (doctorId) => {

    return axios.get(process.env.REACT_APP_BACKEND_URL + `/api/get-type-consultant-by-id?doctorId=${doctorId}`)

}

export { typeConsultantbyIdDoctor };


