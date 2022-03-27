import axios from 'axios'

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
})

axiosClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    let res = error.response
    if(res.status == 401) {
      //error handling code
    }
    return Promise.reject(error)
  }
)

export default axiosClient