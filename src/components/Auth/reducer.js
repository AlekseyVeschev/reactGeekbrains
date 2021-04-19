import { SET_IS_AUTH, SET_IS_LOADING, SET_ERROR, SET_USER_EMAIL } from './actions'

const initialState = {
   userEmail: "",
   isAuth: false,
   isLoading: false,
   error: ""
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_IS_AUTH:
         return {
            ...state,
            isAuth: action.payload
         }
      case SET_USER_EMAIL:
         return {
            ...state,
            userEmail: action.payload
         }
      case SET_IS_LOADING:
         return {
            ...state,
            isLoading: action.payload
         }
      case SET_ERROR:
         return {
            ...state,
            error: action.payload.message || action.payload
         }
      default:
         return state
   }
}
export default authReducer