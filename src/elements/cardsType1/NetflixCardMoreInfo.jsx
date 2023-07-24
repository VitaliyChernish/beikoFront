import React, { useEffect } from "react";
import s from './netflixCard.module.scss';
import './netflixCard.scss';
import HeaderButtonContainer from "../headerButtonCOntainer/HeaderButtonContainer";
import { hideNetflixContent } from "../../store/netflixCard/actionNetflix";
import { useDispatch } from "react-redux";

const NetflixCardMoreInfo = ({ title, description, imageUrl, price, longDescription }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        // Вимкнення прокрутки заднього фону
        document.body.style.overflow = 'hidden';

        return () => {
            // Відновлення прокрутки заднього фону при видаленні компоненти
            document.body.style.overflow = 'auto';
        };
    }, []);

    const hideNetflixInfoFunction = () => {
        document.getElementById('scrollingContainer').style.animation = 'legalUnRender .5s forwards'
        document.getElementById('scrollingContainerMain').style.animation = 'legalUnRenderOpacity .5s forwards'
        setTimeout(() => {
            dispatch(hideNetflixContent())
        }, 500)
    }

    return (
        <div id="scrollingContainerMain" className={s.maximumInfoContainer} onClick={hideNetflixInfoFunction}>
            <div id="scrollingContainer" className={s.scrollContainer} onClick={(e) => e.stopPropagation()}>
                <div className={s.contentMaxInfo} >
                    <div className={s.imageContainer}>
                        <div className={s.closeButton} onClick={hideNetflixInfoFunction}></div>
                        <img src={imageUrl} alt="" />
                        <div className={s.headerButtonContainerMain}>
                            <span>{title}</span>
                            <div className={s.headerButtonContainer}>
                                <HeaderButtonContainer  headerPrice={price} headerText={'Some text'} buttonText={'ЗАМОВИТИ'} fontSize={{ height: '1.5vw', fontSize: '1vw', lineHeight: '1.5vw' }} />
                            </div>
                        </div>
                        <div className={s.gradientMask}></div>
                    </div>
                    <div className={s.descriptionsContainer} dangerouslySetInnerHTML={{ __html: longDescription }}></div>
                </div>
            </div>
        </div>
    )
}

export default NetflixCardMoreInfo;
