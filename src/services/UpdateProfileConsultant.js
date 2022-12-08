import axios from "axios";
const UpdateProfileConsultant = (data) => {
    return axios.put(process.env.REACT_APP_BACKEND_URL + '/api/update-profile-consultant', data)
}


export { UpdateProfileConsultant };