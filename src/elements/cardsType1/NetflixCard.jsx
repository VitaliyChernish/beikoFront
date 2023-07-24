import React, { useState } from 'react';
import styles from './netflixCard.module.scss';
import { useSpring, animated } from 'react-spring';
import HeaderButtonContainer from '../headerButtonCOntainer/HeaderButtonContainer';
import NetflixCardMoreInfo from './NetflixCardMoreInfo';
import { store } from '../../store/index'
import { parseData, updateOffer, deleteOffer } from '../../utils/functions';
import { serverApi } from '../../utils/consts';

const NetflixCard = ({ index, title, price, description, fullDescription, imageUrl }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [inputTitle, setInputTitle] = useState(title)
    const [inputDescription, setInputDescription] = useState(description)
    const [longDescription, setLongDescription] = useState(fullDescription)
    const [inputPrice, setInputPrice] = useState(price)
    const [image, setImage] = useState(imageUrl)

    const { scale, y, opacity } = useSpring({
        from: { scale: `translateY(0%) scale(1)`, y: '0', opacity: 0 },
        to: {
            scale: isHovered ? `translateY(-10%) scale(1.3)` : `translateY(0%) scale(1)`,
            y: isHovered ? '100%' : '0',
            opacity: isHovered ? 1 : 0
        },
    });

    const [selectedImage, setSelectedImage] = useState(null);

    const handleFileChange = (event) => {

        const file = event.target.files[0];
        setSelectedImage(file);
    };

    store.subscribe(() => {
        switch (store.getState().NetflixReducer.setShowAndHide) {
            case true: {
                return setShowInfo(true)
            }
            case false: {
                return setShowInfo(false)
            }
            default: {
                return setShowInfo(false)
            }
        }
    })



    function fetchOneSkill(index) {
        fetch(`${serverApi}:5000/api/offers/${index}`)
            .then(response => response.json())
            .then(skill => {
                setImage(`${serverApi}:5000/static/${skill.img}`);
            })
            .catch(error => console.error(error));
    }
    const updateCardInfo = (event) => {
        event.preventDefault();
        event.stopPropagation()
        updateOffer(
            inputTitle,
            inputDescription,
            longDescription,
            inputPrice,
            selectedImage,
            index)
        setTimeout(() => {
            fetchOneSkill(index)
        }, 1000)
    }
    const handlePriceChange = (newPrice) => {
        setInputPrice(newPrice);
        // Виконайте потрібні дії при зміні "price" в батьківському компоненті
    };
    return (
        <>

            {showInfo &&
                <NetflixCardMoreInfo
                    title={title}
                    description={description}
                    imageUrl={image}
                    price={price}
                    longDescription={longDescription}
                />
            }
            <animated.div id='netflixCardMain' key={index} className={styles.card}
                style={{
                    zIndex: isHovered ? 100 : 1,
                    cursor: 'pointer',
                    transform: scale,
                }}
                onClick={() => window.innerWidth <= 1100 ? setShowInfo(true) : null}
                onMouseEnter={(e) => {
                    if (window.innerWidth < 1199) {
                        e.target.style.scale = 1.2
                        e.target.style.transition = '1s'
                    } else {
                        setIsHovered(true)
                    }
                }}
                onMouseLeave={(e) => {
                    if (window.innerWidth < 1199) {
                        e.target.style.scale = 1
                    } else {
                        setIsHovered(false)
                    }
                }}
            >
                {parseData('role') === 'ADMIN' ? <div className={styles.deleteButton} onClick={e => deleteOffer(e, index)}>DELETE</div> : null}
                {parseData('role') === 'ADMIN' ? <div onClick={updateCardInfo} className={styles.editPrice} >Зберегти</div> : null}
                {parseData('role') === 'ADMIN'
                    ? <input
                        style={{ position: 'absolute', top: '10vw' }}
                        type="file"
                        accept="image/jpeg, image/png"
                        id="imageForOffer"
                        className={styles.input}
                        onChange={handleFileChange}
                    />
                    : null}
                <img className={styles.card__image}
                    style={{
                        transform: scale,
                    }}
                    src={image} alt={title} />
                <animated.div className={styles.card__body}
                    style={{
                        top: y,
                        opacity: opacity,
                    }}>
                    <div className={styles.priceAndMoreInfoContainer}>

                        <HeaderButtonContainer
                            whatOffer={title}
                            headerPrice={price}
                            buttonText={'ЗАМОВИТИ'}
                            fontSize={{ fontSize: '1vw', height: '1.2vw' }}
                            onPriceChange={handlePriceChange}
                        />
                        <div className={styles.moreInfoContainer} onClick={(event) => {
                            event.stopPropagation();
                            setShowInfo(true);
                        }}>
                            <span className={styles.arrow}></span>
                        </div>
                    </div>
                    <h3 className={styles.card__title} onInput={(e) => setInputTitle(e.target.textContent)} contentEditable={parseData('role') === 'ADMIN' ? 'true' : 'false'}>{title}</h3>
                    <p className={styles.card__description} onInput={(e) => setInputDescription(e.target.textContent)} contentEditable={parseData('role') === 'ADMIN' ? 'true' : 'false'}>{description}</p>
                    <div className={styles.card__actions}>
                    </div>
                </animated.div>
            </animated.div >
        </>
    );
};

export default NetflixCard;