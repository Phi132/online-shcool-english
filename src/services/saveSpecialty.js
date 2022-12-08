import axios from "axios";
const saveSpecialty = (data) => {
  return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/post-save-medical-specialty', data)
}


export { saveSpecialty };