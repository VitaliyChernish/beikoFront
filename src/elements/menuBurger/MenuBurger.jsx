import React from "react";
import s from './menuBurger.module.scss'
import { useNavigate } from "react-router-dom";

const MenuBurger = () => {
    const navigate = useNavigate()

    const showMunu = () => {
        navigate('/contacts')
    }

return (
    <>
        <div className={s.burgerMask} onClick={showMunu}></div>
        <div className={s.burgerMain}></div>
    </>
)
}

export default MenuBurger;