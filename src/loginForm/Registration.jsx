import React from "react";
import s from './loginForm.module.scss';
import { useForm } from "react-hook-form";
import { showMessage } from "../utils/functions";


const Registration = () => {
    const { register, handleSubmit } = useForm();

    function createUser(nameInput, passwordInput, company, avatar) {
        const url = 'http://localhost:5000/api/user/registration'; // URL для реєстрації
        
        const formData = new FormData();

        formData.append('nickName', nameInput);
        formData.append('password', passwordInput);
        formData.append('company', company);
        formData.append('file', avatar);
        formData.append('role', 'ADMIN')

        fetch(url, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
            },
            // body: JSON.stringify(userData)
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                // Обробка відповіді сервера після реєстрації
                showMessage(data.message === undefined ? 'реєстрація успішна' : data.message, 3000); // Результат реєстрації (наприклад, токен)
            })
            .catch(error => {
                // Обробка помилок, якщо такі є
                showMessage(`Помилка при реєстрації: Неможливо з'єднатися з сервером`, 3000);
                console.error('Помилка при реєстрації:', error);
            });
    }

    const onSubmit = (data) => {
        createUser(
            data.nickName,
            data.password,
            data.company,
            data.avatar[0]
        )
        console.log(data);
        console.log(data.avatar[0].name)
    }

    return (
        <>
            <div className={s.formMain} >
                <h1>Реєстрація:</h1>
                <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.field}>
                        <label htmlFor="nickname">Nick Name:</label>
                        <input
                            type="text"
                            id="nickname"
                            // value={'Vetal'}
                            {...register("nickName")}
                            className={s.input}
                        />
                    </div>
                    <div className={s.field}>
                        <label htmlFor="company">Company:</label>
                        <input
                            type="text"
                            id="company"
                            {...register("company")}
                            className={s.input}
                        />
                    </div>
                    <div className={s.field}>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="text"
                            id="password"
                            // value={'kleynod1023'}
                            {...register("password")}
                            className={s.input}
                        />
                    </div>
                    <div className={s.field}>
                        <label htmlFor="avatar">Contact:</label>
                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            id="avatarLoad"
                            {...register("avatar")}
                            className={s.input}
                        />
                    </div>
                    <button type="submit" className={s.button}>
                        Register
                    </button>
                </form>
            </div>
        </>
    )
}

export default Registration;