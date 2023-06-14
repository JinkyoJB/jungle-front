import axios from "axios";
import _ from 'lodash';

const client = axios.create({ baseURL : 'http://localhost:4000'})

export const request = _.debounce(({ ...options}) => {
    client.defaults.headers.common.Authorization = `Bearer token`
    const onSuccess = response => response
    const onError = error => {
        console.error('Error:', error);
    }
    return client(options).then(onSuccess).catch(onError)
}, 300); // 300ms 디바운스 시간