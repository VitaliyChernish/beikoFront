import React from "react";
import s from './offerForm.module.scss'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeOffer } from "../../store/makingOffer/actionsOffer";
import { createClientData, sendMessageToTelegram, showMessage } from "../../utils/functions";
import { store } from "../../store/index";
import { botToken, chatId } from '../../utils/consts'


const OfferForm = () => {

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch()
    const choiceOffer = store.getState().OfferReducer.whatIsOffer
    const priceOffer = store.getState().OfferReducer.whatPrice
    const close = () => {
        dispatch(closeOffer())
    }

    function isValidPhoneNumber(phoneNumber) {
        const phonePattern = /^0\d{9}$|^\+380\d{9}$|^80\d{9}$|^380\d{9}$/;
        return phonePattern.test(phoneNumber);
    }
    const submitForm = (data) => {
        if (!isValidPhoneNumber(data.customerPhone)) {
            showMessage("Будь ласка, введіть номер у форматі 0xxxxxxxxx", 5000);
            return;
        }
        const message = `Хтось оформив замовлення на сайті!!! ${data.customerName} хоче замовити ${choiceOffer ? choiceOffer : 'щось, чи просто проконсультуватись'}. Перевір стек замовлень в адмінці або подзвони: ${data.customerPhone}`
        createClientData(data, choiceOffer, priceOffer)
        sendMessageToTelegram(botToken, chatId, message)
        setTimeout(() => {
            dispatch(closeOffer())
        }, 0)
    }
    return (
        <div className={s.offerFormMain} onClick={close}>
            <div className={s.mainContainer} onClick={(e) => e.stopPropagation()}>
                <div className={s.header}>ЗАЛИШТЕ ІНФОРМАЦІЮ ПРО СЕБЕ</div>
                <div className={s.div2}>Я з Вами зв’яжусь і з радістю допоможу!</div>
                <form className={s.loginForm} onSubmit={handleSubmit(submitForm)}>
                    <input
                        type="text"
                        placeholder="Ваше ім'я"
                        id="customerName"
                        {...register("customerName")}
                        required
                    />
                    
                    <input
                        type="text"
                        placeholder="Ваш телефон"
                        id="customerPhone"
                        {...register("customerPhone")}
                        required
                    />
                    {choiceOffer &&
                        <input
                            type="text"
                            id="choiceoffer"
                            value={choiceOffer + ' ' + priceOffer}
                            {...register("choiceoffer")}
                        />
                    }
                    
                    <button type="submit" className={s.createButton}>
                        ЗАМОВИТИ
                    </button>
                </form>
            </div>
        </div>
    )
}

export default OfferForm;