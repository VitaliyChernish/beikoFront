import React from "react";
import s from './showAndHideMunu.module.scss'
import Logo from "../../elements/logo/Logo";
import PhoneNumber from "../../elements/phoneNumber/PhoneNumber";
import ButtonOffer from "../../elements/buttonOffer/ButtonOffer";
import { socialMediaArrs } from "../../utils/arreys";
import { useNavigate } from "react-router-dom";
import './animation.scss'

const ShowAndHideMunu = () => {
    const navigate = useNavigate()

    const closePage = () => {
        document.getElementById('showAndHideMunu').style.animation = 'showAndHideMunuClose .5s forwards'
        return (
            setTimeout(() => {
                navigate('/')
            }, 500)
        )
    }

    return (
        <div id="showAndHideMunu" className={s.showMenu} >
            <div className={s.showAndHideMunuMain}>
                <div className={s.left}>

                </div>
                <div className={s.right}>

                    <div className={s.closeIconContainer}>
                        <button type="button" className={s.closeButton} onClick={closePage} aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className={s.logoContent}>
                        <div className={s.logo}>
                            <div className={s.logoAndTitle}>
                                <div className={s.logo}><Logo /></div>
                                <div className={s.title}><h2>BeikoVideo</h2></div>
                            </div>
                        </div>
                        <PhoneNumber />
                        <a href="mailto:BeicoVideo@gmail.com">BeicoVideo@gmail.com</a>
                        <a href="https://t.me/Video_Serhii_Beiko" target="blank" style={{ userSelect: 'text' }}>@Video_Serhii_Beiko</a>
                        <ButtonOffer />
                    </div>
                    <div className={s.socialMedia}>
                        {socialMediaArrs.map(el => {
                            return (
                                <div key={el.id} className={s.social}>
                                    <a href={el.link} target="_blank">
                                        <img src={el.icon} alt={el.name} />
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowAndHideMunu;