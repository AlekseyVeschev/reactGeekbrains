import { AUTHORS, BOT_AVATAR } from '../../utils/constants'
import { ADD_MESSAGE, REMOVE_MESSAGE, WAIT_BOT_RESPONSE, RECEIVED_BOT_RESPONSE } from './actions'


const initialState = {
   items: {
      "1": [
         { id: "1", text: "Hi", author: AUTHORS.ME, date: "Sat Apr 04 2021 17:46:21" },
         { id: "2", text: "Your question", author: AUTHORS.BOT, avatar: BOT_AVATAR, date: "Sat Apr 04 2021 17:46:21" }
      ],
   },
   botResponseIds: []
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
                     text: action.payload.text,
                     author: action.payload.author,
                     date: action.payload.date
                  }
               ]
            }
         }
      case REMOVE_MESSAGE:
         return {
            ...state,
            items: {
               ...state.items,
               [action.payload.chatId]:
                  state.items[action.payload.chatId].filter(item => item.id !== action.payload.messageId)
            }
         }
      case WAIT_BOT_RESPONSE:
         return {
            ...state,
            botResponseIds: [...state.botResponseIds, action.payload]
         }
      case RECEIVED_BOT_RESPONSE:
         return {
            ...state,
            botResponseIds: state.botResponseIds.filter(id => id !== action.payload)
         }
      default:
         return state
   }
}
export default messagesReducer