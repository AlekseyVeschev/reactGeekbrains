import { ADD_CHAT, REMOVE_CHAT, SET_BLINKING_CHAT_ID, REMOVE_BLINKING_CHAT_ID } from './actions'

const initialState = {
   blinkingChatIds: [],
   items: [
      { id: "1148612", name: "BotIvan" },
      { id: "20873", name: "BotAlice" },
      { id: "165", name: "BotBrain" },
   ],
}

const chatsReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_CHAT:
         return {
            ...state,
            items: [...state.items, {
               id: String(state.items.length + 1),
               name: action.payload
            }]
         }
      case REMOVE_CHAT:
         return {
            ...state,
            items: state.items.filter(item => item.id !== action.payload)
         }
      case SET_BLINKING_CHAT_ID:
         return {
            ...state,
            blinkingChatIds: [...state.blinkingChatIds, action.payload]
         }
      case REMOVE_BLINKING_CHAT_ID:
         return {
            ...state,
            blinkingChatIds: state.blinkingChatIds.filter(id => id !== action.payload)
         }
      default:
         return state
   }
}
export default chatsReducer