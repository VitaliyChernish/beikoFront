import React, { useEffect, useState } from "react";
import s from './content3.module.scss'
import NetflixCard from "../../elements/cardsType1/NetflixCard";
import {serverApi} from '../../utils/consts'

const Content3 = () => {

    const [cardsDataFromServer, setCardsDataFromServer] = useState([]);

    useEffect(() => {
        fetchSkills()
    }, [])


    function fetchSkills() {
        fetch(`${serverApi}:5000/api/offers/getAllOffers`)
            .then(response => response.json())
            .then(skills => {
                setCardsDataFromServer(skills);
            })
            .catch(error => console.error(error));
    }

    return (
        <div className={s.content3Main}>
            <div id="contentForScrollingAnimation5" className={s.cards} >
                {cardsDataFromServer.map(card => (
                    < NetflixCard
                        key={card.id}
                        index={card.id}
                        title={card.name}
                        price={card.price}
                        description={card.shortDescription}
                        fullDescription={card.fullDescription}
                        imageUrl={`${serverApi}:5000/static/${card.img}`}
                    />
                ))}
            </div>
        </div>

    )
}

export default Content3;