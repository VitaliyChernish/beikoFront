import React from "react";
import s from './content4.module.scss'
import logoYoutube from '../../statik/logoYoutube.png'

const Content4 = () => {
    function goToYouTube() {
        window.location.href = 'https://www.youtube.com/@serhii-beiko';
    }
    return (
        <div className={s.mainBlock}>
            <div className={s.leftColumn}>
                <div className={s.header1}>
                    <span>ОСТАННІ РОБОТИ:</span>
                </div>
                <div className={s.videos1}>
                    <iframe src="https://www.youtube.com/embed/hgfdSHkLMxU?si=lSTQPezma611KqlM"
                        title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
                </div>
                <div className={s.videos2}>
                    <iframe src="https://www.youtube.com/embed/H73aEKXzmO0?si=Modc2PovDf_nrwY2&amp;controls=0"
                        title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
                </div>
            </div>
            <div className={s.rightColumn}>
                <div className={s.videos3}>
                    <iframe src="https://www.youtube.com/embed/-7RNWFitgOg?si=QnnuVZNkN0nNrG1Q&amp;controls=0"
                        title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
                </div>
                <div className={s.videos4}>
                    <iframe src="https://www.youtube.com/embed/N9xVzQE2x14?si=zCX5nIkTfwQY_EEC&amp;controls=0"
                        title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
                </div>
                <div className={s.logoAndTitleContainer}>
                    <div className={s.logoAndTitle}>
                        <div className={s.logo} onClick={goToYouTube} ><img src={logoYoutube} alt="" /></div>
                        <div className={s.title}>БІЛЬШЕ РОБІТ ЗА ПОСИЛАННЯМ:</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Content4