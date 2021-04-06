import { AUTHORS, BOT_AVATAR } from '../../utils/constants'
import { ADD_MESSAGE } from './actions'
import { SET_MESSAGE_LOADING } from './actions'

const initialState = {
   items: {
      "1": [
         { id: "1", text: "Hello", author: AUTHORS.BOT, avatar: BOT_AVATAR, date: "Sat Apr 04 2021 17:46:21" },
         { id: "2", text: "Hi", author: AUTHORS.ME, date: "Sat Apr 04 2021 17:46:21" },
         { id: "3", text: "Your question", author: AUTHORS.BOT, avatar: BOT_AVATAR, date: "Sat Apr 04 2021 17:46:21" }
      ],
      "2": [{ id: "1", text: "Hi", author: AUTHORS.ME, date: "Sat Apr 04 2021 17:46:21" },
      { id: "2", text: "Your question", author: AUTHORS.BOT, avatar: BOT_AVATAR, date: "Sat Apr 04 2021 17:46:21" }],
   },
   isLoading: false
}

const messagesReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_MESSAGE:
         return {
            ...state,
            items: {
               ...state.items,
               [action.payload.chatId]: [
                  ...(state.items[action.payload.chatId] || []),
                  {
                     id: (state.items[action.payload.chatId]?.length || 0) + 1,
                     ...action.payload.value,
                     date: action.payload.date
                  }
               ]
            }
         }
      case SET_MESSAGE_LOADING:
         return {
            ...state,
            isLoading: action.payload
         }
      default:
         return state
   }
}
export default messagesReducer