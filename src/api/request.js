import axios from 'axios'
import { Message } from 'element-ui'
import { clearAll, getToken } from '@/utils/myAuth'
import router from '@/router'

// create an axios instance
const service = axios.create({
    baseURL: 'http://leju.bufan.cloud', // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        const token = getToken()
        if (token) {

            config.headers['token'] = token
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(

    response => {
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (res.code == 20002) {
            clearAll()
            router.push('/login')
        }
        return res

    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service