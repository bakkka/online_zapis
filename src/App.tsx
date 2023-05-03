import React, {useEffect} from 'react';
import './App.css';
import LoginPage from "./pages/LoginPage/LoginPage";
import {useAppDispatch, useTypedSelector} from "./hooks/redux";
import OpenPage from "./pages/OpenPage/OpenPage";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import TeamRegistrationPage from "./pages/TeamRegistrationPage/TeamRegistrationPage";
import {fetchRefresh} from "./store/reducers/ActionCreator";
import TeamProfilePage from "./pages/TeamProfilePage/TeamProfilePage";

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(localStorage.getItem('accessToken')){
            dispatch(fetchRefresh(localStorage.getItem('refreshToken') || '{}'))
        }
    }, []);
    
    const auth = useTypedSelector(state => state.userReducer.isAuth)
  return (
      <BrowserRouter>
            <Routes>
                <Route path='/' element={<OpenPage/>}></Route>
                <Route path='/profile' element={<ProfilePage/>}></Route>
                <Route path='/teamReg' element={<TeamRegistrationPage/>}></Route>
                <Route path='/teamProfile' element={<TeamProfilePage/>}></Route>
                {!auth ? (
                        <>
                            <Route path='/login' element={<LoginPage/>}></Route>
                            <Route path='/reg' element={<RegistrationPage/>}></Route>
                        </>
                    ) : null}
                <Route path="*" element={<OpenPage/>}/>
            </Routes>
      </BrowserRouter>
  );
}

export default App;
