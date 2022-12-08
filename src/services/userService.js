import axios from 'axios';
const HandleLoginApi = (username, password) => {
    
    return axios.post(process.env.REACT_APP_BACKEND_URL + '/api/login', {email:username,password:password})

}

export { HandleLoginApi };


