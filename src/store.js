import { createStore, applyMiddleware } from 'redux'
import { combineReducers, compose } from 'redux'
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import profileReducer from './components/Profile/reducer'
import chatsReducer from './components/ChatsPage/reducer'
import messagesReducer from './components/MessageField/reducer'
import authReducer from './components/Auth/reducer'

const persistConfig = {
   key: 'reactGB',
   storage,
}

const rootReducer = combineReducers({
   profile: profileReducer,
   chats: chatsReducer,
   messages: messagesReducer,
   auth: authReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, compose(applyMiddleware(thunk),
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));
export const persistor = persistStore(store)