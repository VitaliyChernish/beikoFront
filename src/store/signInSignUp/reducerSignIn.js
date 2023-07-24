import { LOGIN, REGISTRATION } from './actionSignIn.js';

const defaultState = {
    isLogin: true
}

export const TogleLoginReducer = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                isLogin: true
            }
        }
        case REGISTRATION: {
            return {
                ...state,
                isLogin: false
            }
        }
        default: {
            return state
        }
    }
}