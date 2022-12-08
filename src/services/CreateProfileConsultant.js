import axios from "axios";
const CreateProfileConsultant = (data) => {
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/create-profile-consultant', data)
}


export { CreateProfileConsultant };