import {ICity, IData, ITokens, IUser} from "../../types/response/UsersResponse";
import {ITeam} from "../../types/response/TeamResponse";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type state = {
    data: ITeam;
    isAuth: boolean;
    isLoading: boolean;
    error: string;
    errorStatus: boolean;
}
const initialState : state = {
    data : {
        title: '',
        phone: '',
        email: '',
        address: '',
        city:{
            id: 0,
            value: '',
        },
        admin_id: 0,
        tags: [
            {
                value: '',
            }
        ],
        id: 0,
        description: '',
    },
    isAuth: false,
    isLoading:false,
    error: '',
    errorStatus:false
}
export const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers:{
        teamFetchingSuccess(state, action: PayloadAction<ITeam>){
            state.isLoading = false;
            state.error = '';
            state.data = action.payload
        },
        teamUpdateFetchingSuccess(state, action:PayloadAction<ITeam>){
            state.isLoading = false;
            state.error = '';
            state.data = action.payload
        },
    },
})
export default teamSlice.reducer
export const {teamFetchingSuccess, teamUpdateFetchingSuccess} = teamSlice.actions