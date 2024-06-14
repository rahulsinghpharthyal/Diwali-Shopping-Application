import {combineReducers} from 'redux';
import totalReducer from "./totalReducer";


const reducers = combineReducers({
    amount: totalReducer
})

export default reducers;