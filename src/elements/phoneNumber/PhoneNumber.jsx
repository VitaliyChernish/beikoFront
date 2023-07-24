import React from "react";
import s from './phoneNumber.module.scss';

const PhoneNumber = () => {
    return(
        <div className={s.phoneMain}>
            <a href="tel:+380637101672" type="phonenumber">+38 (063)710-16-72</a>
        </div>
    )
}

export default PhoneNumber;