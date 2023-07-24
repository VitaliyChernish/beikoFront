import { rootReducer } from './rootReducer.js';
const { configureStore } = require('@reduxjs/toolkit');

export const store = configureStore({
    reducer: rootReducer,
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

