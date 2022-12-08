import axios from "axios";

export const doctorDetail= (id) => {
    return axios.get(process.env.REACT_APP_BACKEND_URL + `/api/get-detail-doctor-by-id?id=${id}`)
}