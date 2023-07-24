import React, { useState, useRef, useEffect } from "react";
import s from './loginForm.module.scss';
import { store } from '../store/index'
import Registration from "./Registration";
import Login from "./Login";
import './loginForm.css';

const LoginForm = () => {
    const [isActiveLogin, setIsActiveLogin] = useState(!store.getState().TogleLoginReducer.isLogin)
    const [isActiveRegistration, setIsActiveRegistration] = useState(!store.getState().TogleLoginReducer.isLogin)
    const variantFormRef = useRef(null)
    const rightRef = useRef(null)
    const leftRef = useRef(null)

    const [signInSignUp, setSignInSignUp] = useState(store.getState().TogleLoginReducer.isLogin)

    useEffect(() => {
        signInSignUp ? variantFormRef.current.style.left = '17.5%' : variantFormRef.current.style.left = '50%'
    }, [])

    const animation1Ref = useRef(null)
    const animation2Ref = useRef(null)

    useEffect(() => {
        if (isActiveLogin) {
            animation1Ref.current.style.animation = 'moveAnim1 .8s forwards'
            animation2Ref.current.style.animation = 'moveAnim2 .8s forwards'
        }
        if (!isActiveLogin) {
            animation1Ref.current.style.animation = 'moveAnim11 .8s forwards'
            animation2Ref.current.style.animation = 'moveAnim22 .8s forwards'
        }
    }, [isActiveLogin])

    const signIn = () => {
        setIsActiveLogin(false)
        variantFormRef.current.style.left = '17.5%'
        leftRef.current.style.backgroundColor = 'inherit'
        rightRef.current.style.backgroundColor = '#ccc'

        setSignInSignUp(!signInSignUp)
        setIsActiveRegistration(!isActiveRegistration)
    }
    const login = () => {
        setIsActiveLogin(true)
        variantFormRef.current.style.left = '50%'
        leftRef.current.style.backgroundColor = '#ccc'
        rightRef.current.style.backgroundColor = 'inherit'

        setSignInSignUp(!signInSignUp)
        setIsActiveRegistration(!isActiveRegistration)
    }
    return (
        <div className={s.mainBlock}>
            <div className={s.mainForm}>
                <div ref={leftRef} className={s.left}>
                    <div className={s.leftContent} >
                        <h1>Не маєте акаунту?</h1>
                        <button onClick={signIn}>Реєстрація</button>
                    </div>
                </div>
                <div ref={rightRef} className={s.right}>
                    <div className={s.rightContent} onClick={login}>
                        <h1>Є акаунт?</h1>
                        <button onClick={signIn}>Увійти</button>
                    </div>
                </div>
            </div>
            <div ref={variantFormRef} className={s.variantForm}>
                {signInSignUp
                    ? <Registration isActive={isActiveRegistration} />
                    : <Login isActive={isActiveLogin} />}
                <div ref={animation1Ref} className={s.animationLogin1}></div>
                <div ref={animation2Ref} className={s.animationLogin2}></div>
            </div>

        </div>
    );
};

export default LoginForm;