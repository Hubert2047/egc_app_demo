import router from '@/router'
import axios from 'axios'
export const httpRequest = axios.create({})
// httpRequest.interceptors.response.use(
//     function (response) {
//         return response
//     },
//     function (error) {
//         //no cookie token
//         if (error?.response?.status == 403) {
//             router.push('/login')
//         }

//         return Promise.reject(error)
//     }
// )