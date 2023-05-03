import {ICity} from "./UsersResponse";

export interface tags{
    value:string;
}
export interface ITeam{
    title:string;
    phone:string;
    email:string;
    address:string;
    city:ICity;
    admin_id:number;
    tags:tags[] | ITag[];
    id:number;
    description:string;
}
export interface ITag{
    id:number;
    value:string
}
export interface team{
    title: string,
    email: string,
    description: string,
    address: string,
    phone:string,
}
export interface teamUpdate{
    team:team;
    tags:string[];
}
export interface TeamCard{
    description:string;
    id:number;
    title:string;
}