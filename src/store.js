import { createStore } from 'redux'
import { combineReducers, } from 'redux'
import profileReducer from './components/Profile/reducer'
import chatsReducer from './components/ChatsPage/reducer'
import messagesReducer from './components/MessageField/reducer'

const rootReducer = combineReducers({
   profile: profileReducer,
   chats: chatsReducer,
   messages: messagesReducer,
});

export const store = createStore(rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);