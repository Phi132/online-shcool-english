import axios from "axios";
const getDoctorLimit = (limit, roleId) => {
    return axios.get(process.env.REACT_APP_BACKEND_URL + `/api/get-data-doctor-limit?limit=${limit}&roleId=${roleId}`);
}

export { getDoctorLimit };