import axios from "axios";
const AllUserConsultant = () => {
    return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/get-all-consultant');
}


export { AllUserConsultant };