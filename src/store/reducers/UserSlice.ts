import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IUser, IData, ITokens, UpdateUser} from "../../types/response/UsersResponse";
import Auth from "../../API's/Auth";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosResponse} from "axios";
import {AuthResponse} from "../../types/response/AuthResponse";
import {useNavigate} from "react-router-dom";

type state = {
    data: IUser;
    isAuth: boolean;
    isLoading: boolean;
    error: string;
    errorStatus: boolean;
}
const initialState : state = {
    data : {
        user:{
            id: 0,
            name: '',
            email:'',
            phone:'',
            city_id: 0,
            roles:[
                {
                    value: ''
                },
            ],
            teams:[
                {
                    id:0,
                    title:'',
                    description:''
                }
            ],
            master:{
                team_id:0
            }
        },
        tokens:{
            accessToken:'',
            refreshToken:''
        }
    },
    isAuth: false,
    isLoading:false,
    error: '',
    errorStatus:false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        errorDrop(state){
            state.error = ''
        },
        loginFetching(state){
            state.isLoading = true;
        },
        loginFetchingSuccess(state, action: PayloadAction<IUser>){
            state.isLoading = false;
            state.error = '';
            state.isAuth = true;
            state.data.user = action.payload.user
            state.data.tokens = action.payload.tokens
            localStorage.setItem('accessToken', action.payload.tokens.accessToken)
            localStorage.setItem('refreshToken', action.payload.tokens.refreshToken)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        },
        userUpdateFetchingSuccess(state, action:PayloadAction<IData>){
            state.isLoading = false;
            state.error = '';
            state.isAuth = true;
            state.data.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        loginFetchingError(state, action: PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload
        },
        registrationFetching(state){
            state.isLoading = true;
        },
        registrationFetchingSuccess(state, action: PayloadAction<IUser>){
            state.isLoading = false;
            state.error = '';
            state.isAuth = true;
            state.data.user = action.payload.user;
            state.data.tokens = action.payload.tokens
            localStorage.setItem('accessToken', action.payload.tokens.accessToken)
            localStorage.setItem('refreshToken', action.payload.tokens.refreshToken)
            localStorage.setItem('user', JSON.stringify(action.payload.user))
        },
        registrationFetchingError(state, action:PayloadAction<string>){
            state.isLoading = false;
            state.error = action.payload
        },
        logoutFetching(state){
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('user');
            state.isAuth = false;
            state.data.user = {
                id: 0,
                name: '',
                email:'',
                phone:'',
                city_id: 0,
                roles:[
                    {
                        value: ''
                    },
                ],
                teams: [
                    {
                        id:0,
                        title:'',
                        description:''
                    }
                ],
                master:{
                    team_id:0
                }
            }
            state.error = ''
        },
        updateBioFetching(state, action: PayloadAction<IData>){
            state.data.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        updatePasswordError(state, action: PayloadAction<string>){
            state.error = action.payload
        },
        updateTokens(state, action: PayloadAction<ITokens>){
            state.data.tokens = action.payload
            localStorage.setItem('accessToken', action.payload.accessToken)
            localStorage.setItem('refreshToken', action.payload.refreshToken)
            state.data.user = JSON.parse(localStorage.getItem('user') || '{}')
            state.isAuth = true;
        },
        teamRegistrationFetchingError(state, action:PayloadAction<string>){
            state.error = action.payload
        }
    },
})
export default userSlice.reducer
export const {loginFetching, loginFetchingSuccess, loginFetchingError,
    registrationFetching, registrationFetchingSuccess, registrationFetchingError,
    logoutFetching, updateBioFetching, updatePasswordError,errorDrop, updateTokens,
    teamRegistrationFetchingError, userUpdateFetchingSuccess} = userSlice.actions