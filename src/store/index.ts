import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./reducers/UserSlice";
import userReducer from './reducers/UserSlice';
import teamReducer from './reducers/TeamSlice';
const rootReducer = combineReducers({
    userReducer,
    teamReducer
})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export default setupStore
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch']
export type AppStore = ReturnType<typeof setupStore>