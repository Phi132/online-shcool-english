import axios from "axios";
const saveConsultant = (data) => {
    return axios.post('http://localhost:8182/api/post-save-remote-consultant', data)
}


export { saveConsultant };