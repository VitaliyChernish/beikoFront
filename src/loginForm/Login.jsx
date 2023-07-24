import React from "react";
import s from './loginForm.module.scss';
import { useForm } from "react-hook-form";
import { showMessage } from "../utils/functions";
import { useNavigate } from 'react-router-dom';
import { serverApi } from "../utils/consts";

const Login = () => {

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function loginUser(nameInput, passwordInput) {
    const url = `${serverApi}:5000/api/user/login`; // URL для логіну

    const userData = {
      nickName: nameInput,
      password: passwordInput,
    };

    fetch(`${serverApi}:5000/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(data => {
        // Обробка відповіді сервера після логіну
        showMessage(data.message === undefined ? 'авторизація успішна' : data.message, 10000);
        if (data.token) {
          const dataToStore = {
            token: data.token,
            name: data.userName,
            role: data.userRole,
            avatar: `${serverApi}:5000/static/${data.avatar}`
          };
          localStorage.setItem('data', JSON.stringify(dataToStore));
          // Перехід лише у випадку успішного входу в систему
          data.userRole === 'ADMIN' ? navigate('/admincabinet') : navigate('/usercabinet')
        } //work well
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(), 0);
        });
      })
      .catch(error => {
        // Обробка помилок, якщо такі є
        showMessage(`Помилка при авторизації: Неможливо з'єднатися з сервером`, 8000);
        console.error('Помилка при логіні:', error);
      });

    // Виконати логіку реєстрації користувача тут
  }

  const onSubmit = (date) => {
    loginUser(date.nickName, date.password)
  }

  return (
    <>
      <div >
        <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <div className={s.field}>
            <label htmlFor="nickname">Nick Name:</label>
            <input
              type="text"
              id="nickname"
              {...register("nickName")}
              className={s.input}
            />
          </div>
          <div className={s.field}>
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              {...register("password")}
              className={s.input}
            />
          </div>
          <button type="submit" className={s.button}>
            УВІЙТИ
          </button>
        </form>
      </div>
    </>
  )
}

export default Login;