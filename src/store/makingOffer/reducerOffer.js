import { MAKING_OFFER, CLOSE_OFFER } from './actionsOffer.js';

const defaultState = {
    makingOffer: false,
    whatIsOffer: '',
    whatPrice: '',
}

export const OfferReducer = (state = defaultState, action) => {
    switch (action.type) {
        case MAKING_OFFER: {
            return {
                ...state,
                makingOffer: true,
                whatIsOffer: action.whatOffer,
                whatPrice: action.whatPrice
            }
        }
        case CLOSE_OFFER: {
            return {
                ...state,
                makingOffer: false,
                whatIsOffer: '',
                whatPrice: ''
            }
        }
        default: {
            return state
        }
    }
}

