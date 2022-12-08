import axios from 'axios';
const profileConsultant = (id) => {

    return axios.get(process.env.REACT_APP_BACKEND_URL + `/api/get-profile-user-by-doctorId?doctorId=${id}`)

}

export { profileConsultant };


