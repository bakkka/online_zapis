import React, {FC, useEffect, useState} from 'react';
import style from './ProfilePage.module.scss'
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useTypedSelector} from "../../hooks/redux";
import {ICity, IUser} from "../../types/response/UsersResponse";
import City from "../../API's/City";
import {fetchBioUpdate, fetchLogout, fetchPasswordUpdate, fetchUpdateUser} from "../../store/reducers/ActionCreator";
import {errorDrop} from "../../store/reducers/UserSlice";
import styles from "../RegistrationPage/RegistrationPage.module.scss";
import {TeamCard} from "../../types/response/TeamResponse";
import teamPicture from "../../images/team.png"
import heart from "../../images/heart.png"
import Users from "../../API's/Users";

const ProfilePage:FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const error = useTypedSelector(state => state.userReducer.error)
    const userStore = useTypedSelector(state => state.userReducer.data.user)
    const user = JSON.parse(localStorage.getItem('user') || '{}') || userStore

    const [citiesList, setCitiesList] = useState<ICity[]>([])
    const [city_id, setCity_id] = useState<number>(user.city_id)

    const [modal, setModal] = useState(false)
    const [control, setControl] = useState<boolean>(true)
    const [errorStatus, setErrorStatus] = useState<boolean>(false);
    const [teams, setTeams] = useState<TeamCard[]>([])

    const [name, setName] = useState<string>(user.name)
    const [phone, setPhone] = useState<string>(user.phone)
    const [email, setEmail] = useState<string>(user.email)
    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')

    const setCityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCity_id(Number(e.target.value))
    }
    const setNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const setPhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }
    const setEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const setOldPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorStatus(false)
        setOldPassword(e.target.value)
        dispatch(errorDrop())
    }
    const setNewPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorStatus(false)
        setNewPassword(e.target.value)
        dispatch(errorDrop())
    }

    const updateBio = (event: React.MouseEvent<HTMLButtonElement>) => {
        if(name && email && phone && city_id){
            if(oldPassword && newPassword){
                dispatch(fetchPasswordUpdate(user.id, oldPassword, newPassword))
                setOldPassword('')
                setNewPassword('')
            }
            else {
                dispatch(fetchBioUpdate(user.id, name, email, phone, city_id));
            }
        }
    }
    const exit = (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(fetchLogout(user.id));
        navigate('/');
    }
    const like = async (e: number) => {
        const response = await Users.deleteTeam(user.id, e);
        dispatch(fetchUpdateUser(user.id))
    }
    useEffect( () => {
        (async () => {
            const response = await City.getAllCities();
            setCitiesList(response.data)
        })();
    }, []);
    useEffect(() => {
        setTeams(user.teams);
    }, [userStore.teams]);

    useEffect(() => {
        return () => {
                setErrorStatus(true);
        };
    }, [error]);
    useEffect(() => {
        setCity_id(userStore.city_id)
    }, [userStore.city_id]);



    return (
        <div className={style.wrapper}>
            <div className={errorStatus ? style.error : style.errorHide}>{error}</div>
            <div className={style.content}>
                <div className={style.main}>
                    <div className={style.personalData}>
                        <div className={style.form}>
                            <p>Имя</p>
                            <input onChange={(e) => setNameHandler(e)} value={name}></input>
                        </div>
                        <div className={style.form}>
                            <p>Номер телефона</p>
                            <input onChange={(e) => setPhoneHandler(e)} value={phone}></input>
                        </div>
                        <div className={style.form}>
                            <p>Почта</p>
                            <input onChange={(e) => setEmailHandler(e)} value={email}></input>
                        </div>
                        <div className={style.form}>
                            <p>Город</p>
                            <select value={city_id} onChange={(e) => setCityHandler(e)} placeholder={'Выберите город'}>
                                {citiesList.map((city) => (
                                    <option key={city.id} value={city.id}>{city.value}</option>
                                ))}
                            </select>
                        </div>
                        <p onClick={() => setModal(!modal)} className={style.changeForm}>Изменить пароль</p>
                        {modal ? (
                            <div className={style.form}>
                                <input
                                       value={oldPassword}
                                       onChange={(e) => setOldPasswordHandler(e)} className={style.change}
                                       type={control ? 'password'
                                    : "text"} placeholder={'Старый пароль'}></input>
                                <div>
                                    <input style={{height:'38%'}}
                                           value={newPassword}
                                           onChange={(e) => setNewPasswordHandler(e)} className={style.change}
                                           type={control ? 'password'
                                        : "text"} placeholder={'Новый пароль'}></input>
                                    <p style={{scale:'none'}} onClick={() => setControl(!control)} className={control ? style.password_control
                                        : style.password_control_view}/>
                                </div>
                           </div>
                        ) : null}
                        <div style={{marginTop: modal ? '39%' : '60%' }} className={style.buttons}>
                            <button onClick={(e) => updateBio(e)} className={style.save}>Сохранить</button>
                            <button onClick={(e) => exit(e)} className={style.exit}>Выйти</button>
                            <p onClick={() => navigate('/')} className={style.back}>На главную страницу</p>
                        </div>
                    </div>
                    <div className={style.right}>
                        <div className={style.favourites}>
                            {teams.map((team) => (
                                <div key={team.id} className={style.card}>
                                    <img onClick={(e) => like(team.id)} className={style.heart} src={heart}></img>
                                    <div className={style.cardInfo}>
                                        <img src={teamPicture}></img>
                                        <div className={style.cardText}>
                                            <p className={style.cartTitle}>{team.title}</p>
                                            <p className={style.cardDescription}>{team.description}</p>
                                        </div>
                                    </div>
                                    <button>Записаться</button>
                                </div>
                            ))}
                        </div>
                        <div className={style.services}>
                            <div className={style.servicesContent}>
                                <p className={style.activeTitle}>Активные услуги</p>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
