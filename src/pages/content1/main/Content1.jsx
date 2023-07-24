import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import s from './content1.module.scss'
import cs from '../../../statik/cs.mp4'
import './contens.css'
import MainHeader from "../mainHeader/MainHeader";
import ButtonOffer from "../../../elements/buttonOffer/ButtonOffer";
import poster from '../../../statik/Srteem301.png'

const Content1 = () => {
    const [width, setWidth] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setWidth(window.innerWidth)
    }, [])


    return (
        <>
            <div className={s.content1Main}>
                <div id="fastOffer" className={s.backdropFilter}>
                    <div className={s.fastOffer}></div>
                </div>                
                <Header width={width} />
                <div className={s.mainInfo}>
                    <MainHeader />
                    <ButtonOffer />
                </div>
                <div className={s.foneVideo}>
                    <video autoPlay width={`${width}px`}
                        // controls
                        loop
                        muted
                        poster={poster}
                    >
                        <source src={cs} type="video/mp4" />
                        <p>Your browser doesn't support HTML5 video. Here is a <a href="rabbit320.mp4">link to the video</a> instead.</p>
                    </video>
                </div>
            </div>
        </>


    )
}

export default Content1;


