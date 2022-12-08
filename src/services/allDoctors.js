import axios from "axios";
const allDoctors = () => {
    return axios.get(process.env.REACT_APP_BACKEND_URL + '/api/get-all-doctors')
}


export { allDoctors };