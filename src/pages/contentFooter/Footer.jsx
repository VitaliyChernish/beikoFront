import React from "react";
import s from './footer.module.scss';
import Logo from "../../elements/logo/Logo";
import ButtonOffer from "../../elements/buttonOffer/ButtonOffer";
import { socialMediaArrs } from "../../utils/arreys";

const Footer = () => {
    return (
        <div className={s.footerMain}>
            <div className={s.triangleTop}></div>
            <div className={s.triangleBottom}></div>
            <div className={s.upperline}>
                <div className={s.logoAndTitle}>
                    <div className={s.logo}><Logo /></div>
                    <div className={s.title}><h2>BeikoVideo</h2></div>
                </div>
                <ButtonOffer />
            </div>
            <div className={s.underline}>
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
    )
}

export default Footer;