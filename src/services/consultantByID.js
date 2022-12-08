import axios from 'axios';
const consultantByID = (id) => {

    return axios.get(process.env.REACT_APP_BACKEND_URL + `/api/remote-consultant-by-id/${id}`)

}

export { consultantByID };


