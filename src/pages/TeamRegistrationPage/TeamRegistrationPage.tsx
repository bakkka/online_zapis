import React, {FC, useEffect, useState} from 'react';
import styles from "../TeamRegistrationPage/TeamRegistrationPage.module.scss";
import picture2 from '../../images/Ellipse 4.png'
import picture3 from '../../images/Ellipse 5.png'
import plusPicture from '../../images/Group 27.png'
import {useAppDispatch, useTypedSelector} from "../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {fetchRegistration, fetchTeamRegistration} from "../../store/reducers/ActionCreator";
import Auth from "../../API's/Auth";
import City from "../../API's/City";
import {ICity} from "../../types/response/UsersResponse";
import {ITag} from "../../types/response/TeamResponse";


const RegistrationPage:FC = () => {
    const auth = useTypedSelector(state => state.userReducer.isAuth)
    const errorStatus = useTypedSelector(state => state.userReducer.error)
    const admin_id = useTypedSelector(state => state.userReducer.data.user.id)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [control, setControl] = useState<boolean>(true)



    const [city_id, setCity_id] = useState(0)
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [tags, setTags] = useState<ITag[]>([])
    const [currentTag, setCurrentTag] = useState<ITag>({id: 0, value: ""})
    const [apiTags, setApiTags] = useState<object[]>([])
    const [phone, setPhone] = useState('')
    const [title, setTitle] = useState('')
    const [citiesList, setCitiesList] = useState<ICity[]>([])
    const setEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setEmail(e.target.value)
    }
    const setAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setAddress(e.target.value)
    }
    const setTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.target.value)
    }
    const setTagsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        const current = {
            id: tags.length,
            value: e.target.value
        }
        setCurrentTag(current)
    }
    const addTagsHandler = () => {
        let copy = Object.assign([], tags);
        copy.push(currentTag);
        setCurrentTag({id: 0, value: ""})
        setTags(copy)
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
        const newArr: string[] = []
        tags.map((tag) => {
            newArr.push(tag.value)
        })
        if(title && phone && email && address && city_id){
                dispatch(fetchTeamRegistration(title, phone, email, city_id, admin_id, address, newArr))
        } else{
            setError(true)
        }
    }
    const deleteTag = (index: number) => {
        const newArray = tags.filter(tag => tag.id !== index)
        setTags(newArray);
    }

    useEffect(() => {
        return () => {
            setError(true);
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
            <div className={styles.main}>
                <div className={styles.content}>
                    <div className={styles.title}>
                        Регистрация команды
                    </div>
                    <div className={styles.forms}>
                        <div className={styles.left}>
                            <div className={styles.block}>
                                <p>1</p>
                                <img src={picture2}></img>
                                <div>
                                    <div className={styles.block_title}>Название команды</div>
                                    <input style={{borderBottom: error ? '1px solid red' : ''}} value={title}
                                           onChange={(e) => setTitleHandler(e)}></input>
                                </div>
                            </div>
                            <div className={styles.block}>
                                <p>2</p>
                                <img src={picture2}></img>
                                <div>
                                    <div className={styles.block_title}>Номер телефона</div>
                                    <input style={{borderBottom: error ? '1px solid red' : ''}} value={phone}
                                           onChange={(e) => setPhoneHandler(e)}></input>
                                </div>
                            </div>
                            <div className={styles.block}>
                                <p>3</p>
                                <img src={picture2}></img>
                                <div>
                                    <div className={styles.block_title}>Почта</div>
                                    <input style={{borderBottom: error ? '1px solid red' : ''}} value={email}
                                           onChange={(e) => setEmailHandler(e)}></input>
                                </div>
                            </div>
                            <div className={styles.block}>
                                <p style={{color:'black'}}>4</p>
                                <img src={picture2}></img>
                                <div>
                                    <div className={styles.block_title}>Адрес</div>
                                    <input style={{borderBottom: error ? '1px solid red' : ''}} value={address}
                                           onChange={(e) => setAddressHandler(e)}
                                           ></input>
                                </div>
                            </div>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.block}>
                                <p  style={{color:'white'}}>5</p>
                                <img src={picture3}></img>
                                <div>
                                    <div className={styles.block_title} style={{marginBottom:10}}>Город</div>
                                    <select style={{border: error ? '1px solid red' : ''}}
                                            value={city_id} onChange={(e) => setCityHandler(e)} placeholder={'Выберите город'}>
                                        {citiesList.map((city) => (
                                            <option key={city.id} value={city.id}>{city.value}</option>
                                        ))}
                                        <option value={0} selected disabled>Выберите город</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.block}>
                                <p style={{color:'white'}}>6</p>
                                <img src={picture3}></img>
                                <div>
                                    <div className={styles.block_title}>Теги (для лучшего поиска)</div>
                                    <div>
                                        <input style={{borderBottom: error ? '1px solid red' : ''}}
                                               value={currentTag.value} onChange={(e) => setTagsHandler(e)} />
                                        <p onClick={() => addTagsHandler()} style={{scale:'0.9'}} className={styles.plus}/>
                                        <div className={styles.tagsBlock}>
                                            {tags.map((tag,index) => (
                                                <div onClick={(t) => deleteTag(tag.id)}
                                                     key={tag.id}
                                                     className={styles.tag}>{tag.value}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={(event) => registration(event)}>Зарегистрировать</button>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
