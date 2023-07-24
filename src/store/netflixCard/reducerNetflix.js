import { SHOW_NETFLIX_CONTENT, HIDE_NETFLIX_CONTENT } from './actionNetflix.js'

// const userLanguage = navigator.language || navigator.languages[0]

const defaultState = {
    setShowAndHide: false
}

export const NetflixReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SHOW_NETFLIX_CONTENT: {
            return state = { setShowAndHide: true }
        }
        case HIDE_NETFLIX_CONTENT: {
            return state = { setShowAndHide: false }
        }
        default: {
            return state
        }
    }
}