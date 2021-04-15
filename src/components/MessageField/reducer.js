import { ADD_MESSAGE, REMOVE_MESSAGE, WAIT_BOT_RESPONSE, RECEIVED_BOT_RESPONSE, GET_MESSAGE_ERROR } from './actions'


const initialState = {
   items: {
      "1": [],
   },
   botResponseIds: [],
   error: "",
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
                     id: action.payload.id,
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
            botResponseIds: [...state.botResponseIds, action.payload],
            error: ""
         }
      case RECEIVED_BOT_RESPONSE:
         return {
            ...state,
            botResponseIds: state.botResponseIds.filter(id => id !== action.payload)
         }
      case GET_MESSAGE_ERROR:
         return {
            ...state,
            error: action.payload
         }
      default:
         return state
   }
}
export default messagesReducer