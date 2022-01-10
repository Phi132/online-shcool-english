import axios from "axios";
const storeDoctor = (data) => {
    return axios.put('http://localhost:8182/api/store-info-doctor',data)
}


export { storeDoctor };