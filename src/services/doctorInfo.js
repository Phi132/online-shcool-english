import axios from "axios";

export const doctorInfo= (id) => {
    return axios.get(process.env.REACT_APP_BACKEND_URL + `/api/get-detail-doctor-allcodes-users?id=${id}`)
}