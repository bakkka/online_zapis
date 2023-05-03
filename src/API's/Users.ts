import {AxiosInstanceUsers} from "./axiosInstance";
import {AxiosResponse} from "axios";
import {IData, IUser} from "../types/response/UsersResponse";


export default class Users{
    static async getAllUsers():Promise<AxiosResponse<IUser[]>>{
        return AxiosInstanceUsers.get<IUser[]>('')
    }
    static async userBioUpdate(id:number, name:string, email:string, phone:string, city_id:number):Promise<AxiosResponse<IData>>{
        return AxiosInstanceUsers.put<IData>(`/${id}`,{name,email,phone, city_id})
    }
    static async userPasswordUpdate(id: number, oldPassword: string, newPassword: string):Promise<AxiosResponse>{
        return AxiosInstanceUsers.put<AxiosResponse>(`/password/${id}`,{oldPassword,newPassword})
    }
    static async addTeam(userId: number, teamId: number):Promise<AxiosResponse>{
        return AxiosInstanceUsers.post<AxiosResponse>(`${userId}/team/${teamId}`)
    }
    static async deleteTeam(userId: number, teamId: number):Promise<AxiosResponse>{
        return AxiosInstanceUsers.delete<AxiosResponse>(`${userId}/team/${teamId}`)
    }
    static async getUser(id:number):Promise<AxiosResponse<IData>>{
        return AxiosInstanceUsers.get<IData>(`/${id}`)
    }

}