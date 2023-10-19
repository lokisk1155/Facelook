import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import friendReducer from './friend';
import postsReducer from './post';
import sessionReducer from './session';
import simpleUsersReducer from './simpleUsers';
import userReducer from './user';
import userPostsReducer from './profilePage';
import { storiesReducer } from './story';

export const rootReducer = combineReducers({
  session: sessionReducer,
  user: userReducer,
  posts: postsReducer,
  userPosts: userPostsReducer,
  friends: friendReducer,
  simpleUsers: simpleUsersReducer,
  stories: storiesReducer,
});

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

export default configureStore;
