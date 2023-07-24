import React from "react";
import s from './customHeader.module.scss';

const CustomHeader = ({ text, descriptions, justify }) => {

    return (
        <div className={s.text} style={{justifyContent: justify}}>
            {text}
            <div className={s.description}>
                {Array.isArray(descriptions) && descriptions.map((el, index) => (
                    <p key={index}>{el}</p>
                ))}
            </div>
        </div>
    )
}

export default CustomHeader;