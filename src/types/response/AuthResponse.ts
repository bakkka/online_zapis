import {ITokens, IUser} from "./UsersResponse";

export interface AuthResponse{
    tokens:ITokens;
    user : IUser;
}
