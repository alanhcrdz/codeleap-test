import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import postsReducer from './reducers';

const rootReducer = combineReducers({
    postsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

