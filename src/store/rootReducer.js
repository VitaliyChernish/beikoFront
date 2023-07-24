import { combineReducers } from 'redux';
import { NetflixReducer } from './netflixCard/reducerNetflix'
import {TogleLoginReducer} from './signInSignUp/reducerSignIn'
import { OfferReducer } from './makingOffer/reducerOffer';

export const rootReducer = combineReducers({
    NetflixReducer,
    TogleLoginReducer,
    OfferReducer,
});