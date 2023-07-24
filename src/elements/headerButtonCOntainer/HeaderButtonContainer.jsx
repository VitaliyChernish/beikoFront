import React, { useId, useEffect, useState } from "react";
import s from './headerButtonContainer.module.scss';
import { parseData, createClientData } from "../../utils/functions";
import { useDispatch } from "react-redux";
import { makingOffer } from "../../store/makingOffer/actionsOffer";

const HeaderButtonContainer = ({ whatOffer, headerPrice, buttonText, fontSize, onPriceChange }) => {
    const id = useId()

    const handlePriceChange = (newPrice) => {
        // Викликайте зворотну функцію зміни "price"

        onPriceChange(newPrice);
    };

    const [show, setShow] = useState(true)
    const dispatch = useDispatch()

    const itsOffer = () => {
        dispatch(makingOffer(whatOffer, headerPrice))
        setShow(!show)
    }

    const spanButtonMouseEnter = () => {
        document.getElementById(`${id}-headerBackgroundMask`).style.animation = `${s.changeBackgroundMask} .5s ease-in-out forwards`
        document.getElementById(`${id}-buttonBackgroundMask`).style.animation = `${s.changeButtonMask} .5s ease-in-out forwards`
        document.getElementById(`${id}-spanButton`).style.color = `white`
        document.getElementById(`${id}-headerlabel`).style.color = `gray`
    }
    const spanButtonMouseLeave = () => {
        document.getElementById(`${id}-headerBackgroundMask`).style.animation = `${s.changeBackgroundMaskTrue} .5s ease-out  forwards`
        document.getElementById(`${id}-buttonBackgroundMask`).style.animation = `${s.changingButtonMaskTrue} .5s ease-out  forwards`
        document.getElementById(`${id}-spanButton`).style.color = `gray`
        document.getElementById(`${id}-headerlabel`).style.color = `white`
    }

    return (
        <div id={`${id}-headerButtonContainer`} className={s.headerButtonContainer} style={fontSize}>
            <div id={`${id}-headerBackground`} className={s.headerGroup}>
                <span className={s.spanForPrice}>Від </span>
                <div id={`${id}-headerlabel`} contentEditable={parseData('role') === 'ADMIN' ? 'true' : 'false'} onInput={(e) => handlePriceChange(e.target.textContent)} className={s.headerlabel}>{headerPrice}</div>
                <div id={`${id}-headerBackgroundMask`} className={s.headerBackgroundMask}></div>
            </div>

            <div id={`${id}-buttonBackground`} className={s.buttonGroup}>
                <span id={`${id}-spanButton`} onClick={itsOffer} onMouseEnter={spanButtonMouseEnter} onMouseLeave={spanButtonMouseLeave} className={s.spanButton}>{buttonText}</span>
                <div id={`${id}-buttonBackgroundMask`} className={s.buttonBackgroundMask}></div>
            </div>

        </div>
    )
}

export default HeaderButtonContainer;