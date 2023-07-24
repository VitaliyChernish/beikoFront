export const MAKING_OFFER = 'MAKING_OFFER';
export const CLOSE_OFFER = 'CLOSE_OFFER'

export const makingOffer = (whatOffer, whatPrice) => ({
    type: MAKING_OFFER,
    whatOffer,
    whatPrice
})
export const closeOffer = () => ({
    type: CLOSE_OFFER,
})