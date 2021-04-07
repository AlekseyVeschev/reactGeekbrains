import { ADD_CHAT } from './actions'

const initialState = {
   items: [
      { id: "1", name: "Family" },
      { id: "2", name: "Job" },
      { id: "3", name: "Relaxation" }
   ]
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
      default:
         return state
   }
}
export default chatsReducer