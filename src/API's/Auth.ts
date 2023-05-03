import {AxiosResponse} from "axios";
import AxiosInstanceAuth, {
    AxiosInstanceCities,
    AxiosInstanceLogOut,
    AxiosInstanceRefresh,
    AxiosInstanceUsers
} from "./axiosInstance";
import {AuthResponse} from "../types/response/AuthResponse";
import {ITokens, IUser} from "../types/response/UsersResponse";

export default class Auth{
    static async login(email: string, password:string): Promise<AxiosResponse<IUser>>{
        return AxiosInstanceAuth.post<IUser>('/login',{email, password})
    }
    static async registration(name:string, email: string, phone:string, password:string, city_id:number): Promise<AxiosResponse<IUser>>{
        return AxiosInstanceAuth.post<IUser>('/registration',{name,email, phone, password, city_id})
    }
    static async logout(id:number): Promise<void>{
        return AxiosInstanceLogOut.post(`/logout/${id}`)
    }
    static async refresh(refreshToken:string): Promise<AxiosResponse<ITokens>>{
        return AxiosInstanceRefresh.post<ITokens>('', {refreshToken})
    }
}