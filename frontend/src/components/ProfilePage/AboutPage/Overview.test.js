import renderer from 'react-test-renderer';
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import  Overview  from './Overview'
import { Provider } from 'react-redux'
import { Route, MemoryRouter } from 'react-router-dom'
import userReducer from '../../../store/user';
import sessionReducer from '../../../store/session';
import { setCurrentProfile } from '../../../store/user';
import { setCurrentUser } from '../../../store/session';
import TestRenderer from 'react-test-renderer'
import ReactDOMServer from 'react-dom/server';
import { useDispatch } from 'react-redux';

// const dispatch = useDispatch() 

// // dispatch(setCurrentProfile(currentUser))

let enhancer;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
enhancer = composeEnhancers(applyMiddleware(thunk));




export const rootReducer = combineReducers({
    session: sessionReducer,
    user: userReducer,
  });


  const configureStore = (preloadedState = {}) => {
    const user = {
            id: 1,
            first_name: 'shawn',
            last_name: 'mallon',
            work: 'dude',
            relationship: 'single',
            education: 'school',
            location: 'katonah'
    }
    const initialState = {
      session: { user: user },
      user: { 1: user} 
    };
    return createStore(rootReducer, { ...preloadedState, ...initialState }, enhancer);
  };
  

const store = configureStore();

it(`renders user data `, async () => {
    const component = ReactDOMServer.renderToString(
        <Provider store={store}>
            <MemoryRouter initialEntries={[`/ProfilePage/1/about`]}>
                <Route path="/ProfilePage/:id/about">
                    <Overview />
                </Route>
            </MemoryRouter>
         </Provider>
    )
    // let tree = component.toJSON();
    //console.log(component, 'root')
    expect(component).toBe('<div class="content-container"><div><p></p><button>Add a workplace</button></div><div><p></p><button>Add Education</button></div><div><p></p><button>Add Location</button></div><div><p></p><button>Add Relationship Status</button></div></div>')
    // .toMatchSnapshot() 

})