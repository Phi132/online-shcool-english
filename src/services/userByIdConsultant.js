import axios from 'axios';
const userByIdConsultant = (id) => {

    return axios.get(process.env.REACT_APP_BACKEND_URL + `/api/get-user-by-id-consultant?consultantId=${id}`)

}

export { userByIdConsultant };


