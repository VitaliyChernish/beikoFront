import { AUTH, ADMIN_AUTH } from './actionsAuth.js';
import { parseData } from '../../utils/functions.js';

const defaultState = {
    role: ''
}

export const isAuthReducer = (state = defaultState, action) => {
    switch (action.type) {
        case AUTH: {
            return {
                ...state,
                role: action.role
            }
        }
        case ADMIN_AUTH: {
            return {
                ...state,
                role: action.role
            }
        }
        default: {
            return state
        }
    }
}

