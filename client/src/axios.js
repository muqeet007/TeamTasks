import axios from 'axios'


const axiosInstance=axios.create(
    {
        base:"http://localhost:3000",
        withCredentials:true
    }
)

export default axios