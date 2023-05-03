export interface ICity{
    id:number;
    value:string
}
export interface IRoles{
    value:string;
}
export interface IMaster{
    team_id:number
}
export interface ITokens{
    accessToken:string;
    refreshToken:string;
}
export interface LikedTeam{
    id:number;
    title:string;
    description:string;
}
export type IData = {
    id: number;
    name: string;
    email:string;
    phone:string;
    city_id:number;
    roles?:IRoles[];
    teams:LikedTeam[];
    master:IMaster | null;
}
export interface IUser{
    user: IData;
    tokens: ITokens;
}
export interface UpdateUser{
    user:IData;
}