import React, { useEffect, useState } from 'react'
import s from './clientCard.module.scss'
import { updateClientData, deleteClientData } from '../../utils/functions'

const ClientCard = ({
    index,
    clientName,
    clientPhone,
    clientEmail,
    clientTelegram,
    clientOffer,
    offerConfirmation,
    offerDetails,
    date
}) => {
    const [confirm, setConfirm] = useState(offerConfirmation)
    const [email, setEmail] = useState(clientEmail)
    const [telegram, setTelegram] = useState(clientTelegram)
    const [offer, setOffer] = useState(clientOffer)
    const [details, setDetails] = useState(offerDetails)

    const updateData = () => {
        updateClientData(
            email,
            telegram,
            offer,
            confirm,
            details,
            index
        )
    }

    return (
        <div className={s.clientCardMain} key={index}>
            <div className={s.element}>
                <div className={s.header}>name:</div>
                <div className={s.value}>{clientName}</div>
            </div>
            <div className={s.element}>
                <div className={s.header}>phone:</div>
                <div className={s.value}>{clientPhone}</div>
            </div>
            <div className={s.element}>
                <div className={s.header}>email:</div>
                <div className={s.value}  onInput={(e) => setEmail(e.target.textContent)} contentEditable='true'>{clientEmail}</div>
            </div>
            <div className={s.element}>
                <div className={s.header}>telegram:</div>
                <div className={s.value} onInput={(e) => setTelegram(e.target.textContent)} contentEditable='true'>{clientTelegram}</div>
            </div>
            <div className={s.element}>
                <div className={s.header}>what offer:</div>
                <div className={s.value} onInput={(e) => setOffer(e.target.textContent)} contentEditable='true'>{clientOffer}</div>
            </div>
            <div className={s.element}>
                <div className={s.header}>price:</div>
                <div className={s.value} onInput={(e) => setDetails(e.target.textContent)} contentEditable='true'>{offerDetails}</div>
            </div>
            <div className={s.element}>
                <div className={s.header}>confirmation:</div>
                <div className={s.value} onClick={() => setConfirm(!confirm)} style={{ backgroundColor: confirm ? 'green' : 'red' }}>{confirm ? 'DONE' : 'WAIT'}</div>
            </div>
            <div className={s.element}>
                <div className={s.header}>creation:</div>
                <div className={s.value}>{date}</div>
            </div>
            <div className={s.element}>
                <div className={s.delete} onClick={e => deleteClientData(e, index)}>DELETE:</div>
                <div className={s.update} onClick={updateData}>UPDATE</div>
            </div>
        </div>
    )
}

export default ClientCard;