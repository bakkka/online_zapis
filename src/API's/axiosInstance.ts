import axios from 'axios';
import env from '../env.json'
const AxiosInstanceAuth = axios.create({
    baseURL: env.TOKEN_URL,
    withCredentials: true,
});
export const AxiosInstanceLogOut = axios.create({
    baseURL: env.TOKEN_URL,
    withCredentials: true,
});
export const AxiosInstanceUsers = axios.create({
    baseURL: env.USER_URL,
    withCredentials: true,
});
export const AxiosInstanceCities = axios.create({
    baseURL: env.CITY_URL,
    withCredentials: true,
});
export const AxiosInstanceRefresh = axios.create({
    baseURL: env.REFRESH_URL,
    withCredentials: true,
})
export const AxiosInstanceTeam = axios.create({
    withCredentials: true,
});
export const AxiosInstanceTeamPhoto = axios.create({
    withCredentials: true,
})
AxiosInstanceTeam.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})
AxiosInstanceTeamPhoto.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    config.headers['Content-Type'] = 'multipart/form-data';
    return config;
})
AxiosInstanceLogOut.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})
AxiosInstanceUsers.interceptors.request.use((config) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})
export default AxiosInstanceAuth