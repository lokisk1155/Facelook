import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import friendReducer from './friend';
import postsReducer from './post';
import sessionReducer from './session';
import userReducer from './user';

export const rootReducer = combineReducers({
    session: sessionReducer,
    user: userReducer,
    post: postsReducer,
    friend: friendReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore