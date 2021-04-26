import firebase from 'firebase/app';
import 'firebase/auth';
import { selectIsAuth } from './selectors'

export const SET_IS_AUTH = "AUTH::SET_IS_AUTH"
export const SET_USER_EMAIL = "AUTH::SET_USER_EMAIL"
export const SET_IS_LOADING = "AUTH::SET_IS_LOADING"
export const SET_ERROR = "AUTH::SET_ERROR"

export const setIsLoading = (payload) => ({ type: SET_IS_LOADING, payload })
export const setUserEmail = (payload) => ({ type: SET_USER_EMAIL, payload })
export const setIsAuth = (payload) => ({ type: SET_IS_AUTH, payload })
export const setError = (payload) => ({ type: SET_ERROR, payload })

export const getAuth = (history) => (dispatch, getState) => {
   try {
      dispatch(setIsLoading(true))
      firebase.auth().onAuthStateChanged((auth) => {
         const userEmail = auth?.email || ""
         const prevIsAuth = selectIsAuth(getState())
         const isAuth = Boolean(auth)
         dispatch(setIsAuth(isAuth))
         dispatch(setUserEmail(userEmail))
         if (isAuth && !prevIsAuth) {
            history.push("/chat")
         }
      })
   } catch (error) {
      dispatch(setError(error))
   } finally {
      dispatch(setIsLoading(false))
   }
}
export const createAccount = ({ email, password }) => async (dispatch) => {
   try {
      dispatch(setError(""))
      dispatch(setIsLoading(true))
      await firebase.auth().createUserWithEmailAndPassword(email, password)
   } catch (error) {
      dispatch(setError(error))
   } finally {
      dispatch(setIsLoading(false))
   }
}
export const signIn = ({ email, password }) => async (dispatch) => {
   try {
      dispatch(setError(""))
      dispatch(setIsLoading(true))
      await firebase.auth().signInWithEmailAndPassword(email, password)
   } catch (error) {
      dispatch(setError(error))
   } finally {
      dispatch(setIsLoading(false))
   }
}
export const signOut = () => async (dispatch) => {
   try {
      await firebase.auth().signOut()
   } catch (error) {
      dispatch(setError(error))
   }
}
