import React, {FC, useEffect, useState} from 'react';
import style from "../TeamProfilePage/TeamProfilePage.module.scss";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useTypedSelector} from "../../hooks/redux";
import picture from '../../images/team.png'
import {fetchGetTeam, fetchTeamPhotoUpdate, fetchUpdateTeam} from "../../store/reducers/ActionCreator";
import picture2 from '../../images/Ellipse 5.png'
import {ITag, tags} from "../../types/response/TeamResponse";
import styles from "../TeamRegistrationPage/TeamRegistrationPage.module.scss";
import Team from "../../API's/Team";


const TeamProfilePage:FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const team = useTypedSelector(state => state.teamReducer.data)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [editMode, setEditMode] = useState<boolean>(false)
    const [active, setActive] = useState<number>(1);
    const [title, setTitle] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [tags, setTags] = useState<ITag[]>([])
    const [currentTag, setCurrentTag] = useState<ITag>({id: 0, value: ""})
    const [apiTags, setApiTags] = useState<object[]>([])
    const setTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const setPhoneHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }
    const setEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const setAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value)
    }
    const setDescriptionHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }
    const setTagsHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const current = {
            id: tags.length,
            value: e.target.value
        }
        setCurrentTag(current)
    }
    const addTagsHandler = () => {
        setCurrentTag({id:0, value:''})
        let copy = Object.assign([], tags);
        copy.push(currentTag);
        const tag = {
            value: currentTag.value
        }
        setCurrentTag({id: 0, value: ""})
        setTags(copy)
        const response = Team.addTag(team.id, tag)
    }
    const deleteTag = (index: ITag) => {
        const newArray = tags.filter(tag => tag.id !== index.id)
        setTags(newArray);
        const tag = {
            value: index.value
        }
        const response = Team.deleteTag(team.id, tag)
    }
    const update = () => {
        const team = {
            title:title,
            email:email,
            phone:phone,
            description:description,
            address:address,
        }
                dispatch(fetchUpdateTeam(user.master.team_id, team))
    }

    useEffect(() => {
        dispatch(fetchGetTeam(user.master.team_id));
    }, []);

    useEffect(() => {
        setPhone(team.phone);
        setTitle(team.title);
        setAddress(team.address);
        setEmail(team.email);
        setDescription(team.description);
        const newArr: ITag[] = []
        team.tags.map((tag) => {
            const current = {
                id: 0,
                value: '',
            }
            current.id = newArr.length;
            current.value = tag.value;
            newArr.push(current)
        })
        setTags(newArr)
    }, [team]);
    useEffect(() => {
        setActive(1);
    }, [editMode]);

    const uploadFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (event.target.files !== null) {
            reader.readAsDataURL(event.target.files[0])
            const file = event.target.files[0];
            setSelectedFile(file);
            dispatch(fetchTeamPhotoUpdate(user.master.team_id, file));
            console.log(file)
        }
    }

    return (
        <div className={style.wrapper}>
            <div className={style.content}>
                {!editMode ?    (
                    <div className={style.main}>
                        <div className={style.personalData}>
                            <div className={style.bio}>
                                <div className={style.head}>
                                    <div className={style.teamPhoto}>
                                        <img  src={`http://localhost:5000/file/team/${team.id}` || picture}></img>
                                    </div>
                                    <p>{team.title}</p>
                                </div>
                                <div className={style.form}>
                                    <p className={style.key}>Адрес</p>
                                    <p className={style.value}>{team.address}</p>
                                </div>
                                <div className={style.form}>
                                    <p className={style.key}>Эл. почта</p>
                                    <p className={style.value}>{team.email}</p>
                                </div>
                                <div className={style.form}>
                                    <p className={style.key}>Контакты</p>
                                    <p className={style.value}>{team.phone}</p>
                                </div>
                                <div>
                                    <p className={style.key}>Описание</p>
                                    <p className={style.description}>{team.description}</p>
                                </div>
                            </div>
                            <div className={style.buttons}>
                                <button onClick={() => setEditMode(true)} className={style.save}>Редактировать</button>
                                <button className={style.exit}>Покинуть</button>
                                <p onClick={() => navigate('/')} className={style.back}>На главную страницу</p>
                            </div>
                        </div>
                        <div className={style.right}>
                            <div className={style.favourites}></div>
                            <div className={style.services}>
                                <div className={style.servicesContent}>
                                    <p className={style.activeTitle}>Активные услуги</p>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={style.main}>
                        <div className={style.personalData}>
                            <div className={style.bio}>
                                <div className={style.editTitle}>
                                    Редактирование
                                </div>
                                <div onClick={() => setActive(1)} className={active === 1 ? style.editFormActive : style.editForm}>
                                    Общая информация
                                </div>
                                <div onClick={() => setActive(2)} className={active === 2 ? style.editFormActive : style.editForm}>
                                    Сотрудники
                                </div>
                                <div onClick={() => setActive(3)} className={active === 3 ? style.editFormActive : style.editForm}>
                                    Услуги
                                </div>
                            </div>
                                <button onClick={() => setEditMode(false)} className={style.editBack}>Выйти</button>
                        </div>
                        <div className={style.right}>
                            <div className={style.editWindow}>
                                <div className={style.editWindow_content}>
                                    <div onClick={() => {
                                        document.getElementById("image")?.click(); // открываем окно выбора файла при клике на картинку
                                    }} className={style.teamPhotoEdit}>
                                        <label  htmlFor="image">
                                            <img src={`http://localhost:5000/file/team/${team.id}`}></img>
                                        </label>
                                        <input id="image" type="file"  accept=".jpg,.jpeg,.png"
                                               onChange={(e) => uploadFiles(e)}
                                               style={{ display: "none" }}></input>
                                    </div>
                                    <div className={style.editWindow_main}>
                                        <div className={style.editTitle}>
                                            Общая информация
                                        </div>
                                        <div className={style.block}>
                                            <p>1</p>
                                            <img src={picture2}></img>
                                            <div>
                                                <div className={style.block_title}>Название команды</div>
                                                <input value={title} onChange={(e) => setTitleHandler(e)}></input>
                                            </div>
                                        </div>
                                        <div className={style.block}>
                                            <p>2</p>
                                            <img src={picture2}></img>
                                            <div>
                                                <div className={style.block_title}>Номер телефона</div>
                                                <input value={phone} onChange={(e) => setPhoneHandler(e)}></input>
                                            </div>
                                        </div>
                                        <div className={style.block}>
                                            <p>3</p>
                                            <img src={picture2}></img>
                                            <div>
                                                <div className={style.block_title}>Почта</div>
                                                <input value={email} onChange={(e) => setEmailHandler(e)}></input>
                                            </div>
                                        </div>
                                        <div className={style.block}>
                                            <p>4</p>
                                            <img src={picture2}></img>
                                            <div>
                                                <div className={style.block_title}>Адрес</div>
                                                <input value={address} onChange={(e) => setAddressHandler(e)}></input>
                                            </div>
                                        </div>
                                        <div className={style.block}>
                                            <p>5</p>
                                            <img src={picture2}></img>
                                            <div>
                                                <div className={style.block_title}>Описание</div>
                                                <textarea value={description} onChange={(e) => setDescriptionHandler(e)}></textarea>
                                            </div>
                                        </div>
                                        <div className={style.block}>
                                            <p>6</p>
                                            <img src={picture2}></img>
                                            <div>
                                                <div className={style.block_title}>Теги</div>
                                                <input value={currentTag.value} onChange={(e) => setTagsHandler(e)}></input>
                                                <p onClick={() => addTagsHandler()} style={{scale:'0.9'}} className={style.plus}/>
                                                <div className={style.tagsBlock}>
                                                    {tags.map((tag,index) => (
                                                        <div onClick={(t) => deleteTag(tag)}
                                                             key={tag.id}
                                                             className={styles.tag}>{tag.value}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={() => update()} className={style.editSave}>Сохранить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamProfilePage;
