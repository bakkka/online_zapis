import {AxiosResponse} from "axios/index";
import {AuthResponse} from "../types/response/AuthResponse";
import AxiosInstanceAuth, {AxiosInstanceCities, AxiosInstanceLogOut} from "./axiosInstance";
import {ICity, IUser} from "../types/response/UsersResponse";

export default class City{
    static async getAllCities(): Promise<AxiosResponse<ICity[]>>{
        return AxiosInstanceCities.get('')
    }
}