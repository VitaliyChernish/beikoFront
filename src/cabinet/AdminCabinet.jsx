import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { createUser, parseData, getAllClientData } from "../utils/functions";
import s from './cabinet.module.scss';
import './admincabinet.scss';
import TextEditor from "../elements/textEditor/TextEditor";
import draftToHtml from 'draftjs-to-html';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../store/isAuth/actionsAuth";
import ClientCard from "./clientCard/ClientCard";
import { serverApi } from "../utils/consts";


const AdminCabinet = () => {
    const { register, handleSubmit } = useForm();
    const [customerData, setCustomerDataFromServer] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [editorStateFullDesc, setEditorStateFullDesc] = useState(EditorState.createEmpty());

    const handleEditorChangeFullDesc = (newEditorState) => {
        setEditorStateFullDesc(newEditorState);
    };

    const onSubmit = (data) => {
        const contentStateFullDesc = editorStateFullDesc.getCurrentContent();
        const rawContentFullDesc = convertToRaw(contentStateFullDesc);
        const htmlContentFullDesc = draftToHtml(rawContentFullDesc);
        createUser(
            data.headerOfOffer,
            data.shortDescriptionOffer,
            htmlContentFullDesc,
            data.offerPrice,
            data.imageForOffer[0]
        )
    }

    const exitUserCabinet = () => {
        setTimeout(() => {
            navigate('/')
        }, 1000)
        const defaultData = { "token": '', "name": '', "role": '', "avatar": '' };
        localStorage.setItem('data', JSON.stringify(defaultData));
        return dispatch(auth(parseData('role')))
    }

    useEffect(() => {
        getAllClientData(setCustomerDataFromServer)
    }, [])

    const uploadImage = async (data) => {
        console.log(data.imageForSlider[0])
        const token = parseData('token');
        const formData = new FormData();

        formData.append('file', data.imageForSlider[0]);

        try {
            const response = await fetch(`${serverApi}:5000/api/slider1/createSlider1`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Something went wrong with the server request.');
            }

            // Optionally, you can handle the response data here
            const responseData = await response.json();
            console.log('Response data:', responseData);
        } catch (error) {
            console.error('Error uploading image:', error);
            // Handle error here (show an error message, etc.)
        }
    };

    return (
        <>
            <div className={s.formMain} >
                <div className={s.headerAndExit}>
                    <div>Admin Cabinet</div>
                    <div className={s.exitButton} onClick={exitUserCabinet}>EXIT ADMIN CABINET</div>
                </div>
                <form onSubmit={handleSubmit(uploadImage)}>
                    <h1 >UPLOAD IMAGE FOR SLIDER</h1>
                    <label htmlFor="imageForSlider">Зображення:</label>
                    <input
                        type="file"
                        accept="image/jpeg, image/png"
                        id="imageForSlider"
                        {...register("imageForSlider")}
                        className={s.input}
                    />
                    <button type="submit" className={s.createButton}>
                        Підтвердити завантаження
                    </button>
                </form>
                <div className={s.clientCards}>
                    {customerData.map(el => (
                        <ClientCard
                            index={el.id}
                            clientName={el.clientName}
                            clientPhone={el.clientPhone}
                            clientEmail={el.clientEmail}
                            clientTelegram={el.clientTelegram}
                            clientOffer={el.clientOffer}
                            offerConfirmation={el.offerConfirmation}
                            offerDetails={el.offerDetails}
                            date={el.date}
                        />
                    ))}
                </div>
                <h1>Створити картку послуги:</h1>
                <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.field}>
                        <label htmlFor="headerOfOffer">Заголовок картки:</label>
                        <input
                            type="text"
                            id="headerOfOffer"
                            {...register("headerOfOffer")}
                            className={s.input}
                        />
                    </div>
                    <div className={s.field}>
                        <label htmlFor="shortDescriptionOffer">Короткий опис картки:</label>
                        <input
                            type="text"
                            id="shortDescriptionOffer"
                            {...register("shortDescriptionOffer")}
                            className={s.input}
                        />
                    </div>
                    <div className={s.field}>
                        <label htmlFor="fullDescriptionOffer">Повний опис картки. (доступно вставлення з текстових редакторів типу Microsoft Word):</label>
                        <TextEditor
                            handleEditorChange={handleEditorChangeFullDesc}
                            editorState={editorStateFullDesc} />
                    </div>
                    <div className={s.field}>
                        <label htmlFor="offerPrice">Ціна послуги:</label>
                        <input
                            type="text"
                            id="offerPrice"
                            {...register("offerPrice")}
                            className={s.input}
                        />
                    </div>
                    <div className={s.field}>
                        <label htmlFor="imageForOffer">Зображення:</label>
                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            id="imageForOffer"
                            {...register("imageForOffer")}
                            className={s.input}
                        />
                    </div>
                    <button type="submit" className={s.createButton}>
                        Підтвердити створення
                    </button>
                </form>
            </div>
        </>
    )
}

export default AdminCabinet;