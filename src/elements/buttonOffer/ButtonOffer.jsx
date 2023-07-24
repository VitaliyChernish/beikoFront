import React, { useState } from "react";
import s from './buttonOffer.module.scss';
import { useDispatch } from "react-redux";
import { makingOffer } from "../../store/makingOffer/actionsOffer";

const ButtonOffer = () => {
    const [show, setShow] = useState(true)
    const dispatch = useDispatch()

    const itsOffer = () => {
        dispatch(makingOffer())
        setShow(!show)
    }

    return (
        <>
            <button className={s.buttonContainerMain} onClick={itsOffer}>ЗАМОВИТИ</button>
        </>
    )
}

export default ButtonOffer;