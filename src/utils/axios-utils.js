import axios from "axios";

//백엔드 서버 연결
// const client = axios.create({ baseURL : 'http://43.201.112.156:4000'})

//json server 등 연결
const client = axios.create({ baseURL : 'http://localhost:4000'})

export const request = ({ ...options}) => {
    client.defaults.headers.common.Authorization = `Bearer token`
    const onSuccess = response => response
    const onError = error => {
        return error
    }
    return client({...options, withCredentials: true}).then(onSuccess).catch(onError)
}