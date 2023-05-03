import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useTypedSelector} from "../../hooks/redux";
import styles from './OpenPage.module.scss'
import {useNavigate} from "react-router-dom";
import City from "../../API's/City";
import {ICity} from "../../types/response/UsersResponse";
import Team from "../../API's/Team";
import {ITeam} from "../../types/response/TeamResponse";
import style from "../TeamProfilePage/TeamProfilePage.module.scss";
import picture from "../../images/users.png";
import Users from "../../API's/Users";
import {fetchUpdateUser} from "../../store/reducers/ActionCreator";
const OpenPage:FC = () => {
    const auth = useTypedSelector(state => state.userReducer.isAuth)
    const team_id = useTypedSelector(state => state.userReducer.data.user.master)
    const userCity = useTypedSelector(state => state.userReducer.data.user.city_id)
    const user = useTypedSelector(state => state.userReducer.data.user)
    const [searchMode, setSearchMode] = useState<boolean>(false);
    const [citiesList, setCitiesList] = useState<ICity[]>([])
    const [cityId, setCityId] = useState(0)
    const [searched, setSearched] = useState<ITeam[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [canMakeRequest, setCanMakeRequest] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const setCityHandler = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCityId(Number(e.target.value))
        const response = await Team.search(Number(e.target.value), searchValue)
        setSearched(response.data);
    }
    const setSearchValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        setCanMakeRequest(false);
    }
    useEffect( () => {
        (async () => {
            const response = await City.getAllCities();
            setCitiesList(response.data)
        })();
    }, []);

    useEffect(() => {
        setCityId(userCity)
    }, [userCity]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCanMakeRequest(true);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchValue]);

    useEffect(() => {
        (async () => {
            if (canMakeRequest) {
                const response = await Team.search(cityId, searchValue)
                setSearched(response.data);
            }
        })();
    }, [canMakeRequest]);


    const search = async () => {
        const response = await Team.search(cityId, searchValue)
        setSearched(response.data);
    }
    const like = async (e: number) => {
        if(user.teams.find((element) => element.id === e) === undefined){
            const response = await Users.addTeam(user.id,e);
        }
        else{
            const response = await Users.deleteTeam(user.id,e);
        }
        dispatch(fetchUpdateUser(user.id))
    }

    return (
        <div className={styles.wrapper}>
                <div className={styles.rectangle}></div>
                <div className={styles.main}>
                    <div className={styles.header}>
                        <p className={styles.logo}>Логотип/название</p>
                        <div className={styles.right}>
                            {auth ? (
                                <p onClick={() => navigate('/profile')} className={styles.login}>Личный кабинет</p>
                            ) : (
                                <p onClick={() => navigate('/login')} className={styles.login}>Войти</p>
                            )}
                            {auth ? (
                                team_id === null ? (
                                <p onClick={() => navigate('/teamReg')} className={styles.login}>Создать команду</p>
                                ) : <p onClick={() => navigate('/teamProfile')} className={styles.login}>Моя команда</p>
                            ) : null}
                        </div>
                    </div>
                    {!searchMode ? (
                        <div className={styles.content}>
                            <div className={styles.content_header}>Онлайн запись</div>
                            <div className={styles.content_description} >Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро заполнить макеты или прототипы содержимым.</div>
                            <button onClick={() => setSearchMode(true)} className={styles.button}>Начать поиск</button>
                        </div>
                    ) : (
                        <div className={styles.searchContent}>
                            <div className={styles.searchBar}>
                                <input onChange={(e) => setSearchValueHandler(e)} value={searchValue} placeholder={'Поиск...'}/>
                                <p onClick={() => search()} className={styles.loop}></p>
                                <select
                                    value={cityId} onChange={(e) => setCityHandler(e)} placeholder={'Выберите город'}>
                                    {citiesList.map((city) => (
                                        <option key={city.id} value={city.id}>{city.value}</option>
                                    ))}
                                </select>
                            </div>
                            {searched.length > 0 ? (
                                <div className={styles.searchedTeam}>
                                    {searched.map((team) => (
                                        <div className={styles.teamBlock}>
                                            <div className={styles.teamPhoto}>
                                                <img src={picture}></img>
                                            </div>
                                            <div className={styles.teamBio}>
                                                <div className={styles.teamHead}>
                                                    <p>{team.title}</p>
                                                    <p>{team.city.value}</p>
                                                </div>
                                                <div className={styles.teamDescription}>
                                                    {team.description}
                                                </div>
                                            </div>
                                            <div onClick={(e) => like(team.id)} className={user.teams.find((element) => element.id === team.id) === undefined ? styles.teamNotLiked : styles.teamLiked}></div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.nothing}>
                                    По вашему запросу ничего не найдено :(
                                </div>
                            )}
                        </div>
                    )}
                </div>
        </div>
    );
};

export default OpenPage;
