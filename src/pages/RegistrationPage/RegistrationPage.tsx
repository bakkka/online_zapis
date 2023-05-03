import React, {FC, useEffect, useState} from 'react';
import styles from "../RegistrationPage/RegistrationPage.module.scss";
import picture from "../../images/Ellipse 1.png";
import picture2 from '../../images/Ellipse 4.png'
import picture3 from '../../images/Ellipse 5.png'
import {useAppDispatch, useTypedSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {fetchRegistration} from "../../store/reducers/ActionCreator";
import Auth from "../../API's/Auth";
import City from "../../API's/City";
import {ICity} from "../../types/response/UsersResponse";
import {errorDrop} from "../../store/reducers/UserSlice";


const RegistrationPage:FC = () => {
    const auth = useTypedSelector(state => state.userReducer.isAuth)
    const errorStatus = useTypedSelector(state => state.userReducer.error)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [control, setControl] = useState<boolean>(true)


    const [city_id, setCity_id] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [citiesList, setCitiesList] = useState<ICity[]>([])
    const setEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setEmail(e.target.value)
        dispatch(errorDrop())
    }
    const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setPassword(e.target.value)
    }
    const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setName(e.target.value)
    }
    const setPasswordRepeatHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setPasswordRepeat(e.target.value)
    }
    const setPhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setPhone(e.target.value)
    }
    const setCityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setError(false)
        setCity_id(Number(e.target.value))
    }

    const registration = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(name && phone && email && password && passwordRepeat && city_id){
                dispatch(fetchRegistration(name, email, phone, city_id, password))
        }
    }

    useEffect(() => {
        return () => {
            navigate('/')
        };
    }, [auth]);

    useEffect(() => {
        return () => {
            setError(true);
            setEmail('')
        };
    }, [errorStatus]);

    useEffect( () => {
        (async () => {
            const response = await City.getAllCities();
            setCitiesList(response.data)
        })();
    }, []);


    return (
        <div className={styles.wrapper}>
            <div className={styles.circle}></div>
            <div className={styles.logo}>Логотип/название</div>
            <div className={error ? styles.error : styles.errorHide}>{errorStatus}</div>
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.title}>
                        Регистрация
                    </div>
                    <div className={styles.forms}>
                        <div className={styles.left}>
                            <div className={styles.block}>
                                <p>1</p>
                                <img src={picture2}></img>
                                <div>
                                    <div className={styles.block_title}>Имя</div>
                                    <input value={name}
                                           onChange={(e) => setNameHandler(e)}></input>
                                </div>
                            </div>
                            <div className={styles.block}>
                                <p>2</p>
                                <img src={picture2}></img>
                                <div>
                                    <div className={styles.block_title}>Номер телефона</div>
                                    <input value={phone}
                                           onChange={(e) => setPhoneHandler(e)}></input>
                                </div>
                            </div>
                            <div className={styles.block}>
                                <p>3</p>
                                <img src={picture2}></img>
                                <div>
                                    <div className={styles.block_title}>Почта</div>
                                    <input value={email}
                                           onChange={(e) => setEmailHandler(e)}></input>
                                </div>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.block}>
                                <p  style={{color:'white'}}>4</p>
                                <img src={picture3}></img>
                                <div>
                                    <div className={styles.block_title} style={{marginBottom:10}}>Город</div>
                                    <select
                                            value={city_id} onChange={(e) => setCityHandler(e)} placeholder={'Выберите город'}>
                                        {citiesList.map((city) => (
                                                <option key={city.id} value={city.id}>{city.value}</option>
                                        ))}
                                        <option value={0} selected disabled>Выберите город</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.block}>
                                <p style={{color:'white'}}>5</p>
                                <img src={picture3}></img>
                                <div>
                                    <div className={styles.block_title}>Пароль</div>
                                    <input  value={password}
                                           onChange={(e) => setPasswordHandler(e)}
                                           type={control ? 'password'
                                               : "text"}></input>
                                </div>
                            </div>
                            <div className={styles.block}>
                                <p style={{color:'white'}}>6</p>
                                <img src={picture3}></img>
                                <div>
                                    <div className={styles.block_title}>Подтвердите пароль</div>
                                    <div>
                                        <input
                                               value={passwordRepeat} onChange={(e) => setPasswordRepeatHandler(e)} type={control ? 'password'
                                            : "text"} />
                                        <p style={{scale:'1'}} onClick={() => setControl(!control)} className={control ? styles.password_control
                                            : styles.password_control_view}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={(event) => registration(event)}>Зарегистрироваться</button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
