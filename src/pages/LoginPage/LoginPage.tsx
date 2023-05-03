import React, {FC, useEffect, useState} from 'react';
import styles from './LoginPage.module.scss'
import {fetchLogin} from "../../store/reducers/ActionCreator";
import {useAppDispatch, useTypedSelector} from "../../hooks/redux";
import Auth from "../../API's/Auth";
import picture from '../../images/Ellipse 1.png'
import {useNavigate} from "react-router-dom";
import {errorDrop, loginFetchingError} from "../../store/reducers/UserSlice";



const LoginPage:FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const auth = useTypedSelector(state => state.userReducer.isAuth)
    const errorStatus = useTypedSelector(state => state.userReducer.error)
    const [error, setError] = useState<boolean>(false)
    const [control, setControl] = useState<boolean>(true)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const setEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setEmail(e.target.value)
        dispatch(errorDrop())

    }
    const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setPassword(e.target.value)
        dispatch(errorDrop())
    }
    const login = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(email && password){
            dispatch(fetchLogin(email, password))
        }
    }
    const registration = (event: React.MouseEvent<HTMLButtonElement>) => {
            navigate('/reg')
    }

    useEffect(() => {
        return () => {
            navigate('/')
        };
    }, [auth]);

    useEffect(() => {
        return () => {
                setError(true);
                setPassword('')
        };
    }, [errorStatus]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.circle}></div>
            <div className={styles.logo}>Логотип/название</div>
            <div className={error ? styles.error : styles.errorHide}>{errorStatus}</div>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.title}>
                        Вход
                    </div>
                    <div className={styles.loginValues}>
                        <label>
                            Почта
                            <input
                                   value={email} onChange={(e) => setEmailHandler(e)}/>
                        </label>
                        <label>
                            Пароль
                            <div>
                                <input
                                    value={password} onChange={(e) => setPasswordHandler(e)} type={control ? 'password'
                                    : "text"} />
                                <p onClick={() => setControl(!control)} className={control ? styles.password_control
                                    : styles.password_control_view}/>
                            </div>
                        </label>
                    </div>
                    <div className={styles.blockButton}>
                        <button onClick={(event) => login(event)}>Войти</button>
                        <button onClick={registration}>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
