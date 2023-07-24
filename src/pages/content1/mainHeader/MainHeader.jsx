import React from "react";
import s from './mainheader.module.scss'

const MainHeader = () => {
    return (
        <div className={s.headerMain}>
            <h1 className={s.headerContain}>СТРІМІНГ ОНЛАЙН ЗАХОДІВ</h1>
        </div>
    )
}

export default MainHeader;