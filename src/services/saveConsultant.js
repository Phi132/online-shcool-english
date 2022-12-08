import axios from "axios";
const saveConsultant = (data) => {
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/post-save-remote-consultant', data)
}


export { saveConsultant };