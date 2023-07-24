import React from "react";
import s from './header.module.scss';
import PhoneNumber from "../../../elements/phoneNumber/PhoneNumber";
import MenuBurger from "../../../elements/menuBurger/MenuBurger";
import Logo from "../../../elements/logo/Logo";

const Header = ({ width }) => {
    return (
        <div className={s.headerMainBox}>
            <div className={s.menuLeft}>
                <div className={s.logoAndTitle}>
                    <div className={s.logo}><Logo /></div>
                    <div className={s.title}><h2>BeikoVideo</h2></div>
                </div>
            </div>
            <div id="burgerMebuId" className={s.menuRight}>
                <PhoneNumber />
                <MenuBurger />
            </div>
        </div>
    )
}

export default Header;