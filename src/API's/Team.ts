import {AxiosResponse} from "axios/index";
import {ITokens, IUser} from "../types/response/UsersResponse";
import AxiosInstanceAuth, {
    AxiosInstanceLogOut,
    AxiosInstanceRefresh,
    AxiosInstanceTeam,
    AxiosInstanceTeamPhoto
} from "./axiosInstance";
import axios from "axios";
import {ITeam, tags, team} from "../types/response/TeamResponse";

export default class Team{
    static async create(title: string, phone:string, email:string,city_id:number, admin_id:number,address:string,
                        tags:string[]): Promise<AxiosResponse<string>>{
        return AxiosInstanceTeam.post('http://localhost:5000/team',{title, phone, email, city_id, admin_id, address, tags})
    };
    static async get(id:number): Promise<AxiosResponse<ITeam>>{
        return axios.get(`http://localhost:5000/team/${id}`)
    };
    static async update(id:number, team:team): Promise<AxiosResponse<ITeam>>{
        return AxiosInstanceTeam.put(`http://localhost:5000/team/${id}`,{team})
    };
    static async addTag(id:number, tag:tags): Promise<AxiosResponse<string>>{
        return AxiosInstanceTeam.post(`http://localhost:5000/team/${id}/tag`,tag)
    };
    static async deleteTag(id:number, tag:tags): Promise<AxiosResponse<string>>{
        return AxiosInstanceTeam.delete(`http://localhost:5000/team/${id}/tag`,{data:tag})
    };
    static async search(cityId:number, search:string): Promise<AxiosResponse<ITeam[]>>{
        if (cityId !== null && search !== ''){
            return AxiosInstanceTeam.get(`http://localhost:5000/team?${'city_id=' + cityId}&${'search=' + search}`)
        }
        else if (cityId == null && search !== ''){
            return AxiosInstanceTeam.get(`http://localhost:5000/team?${'search=' + search}`)
        }
        else if (cityId !== null && search == ''){
            return AxiosInstanceTeam.get(`http://localhost:5000/team?${'city_id=' + cityId}`)
        }
        else{
            return AxiosInstanceTeam.get(`http://localhost:5000/team`)
        }
    };
    static async updatePhoto(id:number, file: FormData): Promise<AxiosResponse<string>>{
        return AxiosInstanceTeamPhoto.put(`http://localhost:5000/team/${id}/image`,file)
    };
}