import axios from "axios";

export const getAllCode= (typeInput) => {
    return axios.get(process.env.REACT_APP_BACKEND_URL + `/api/allcode?type=${typeInput}`)
}