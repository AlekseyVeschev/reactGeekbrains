export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE"
export const SET_MESSAGE_LOADING = "MESSAGES::SET_MESSAGE_LOADING"

export const addMessageAction = (payload) => ({ type: ADD_MESSAGE, payload })
export const setMessageLoading = (payload) => ({ type: SET_MESSAGE_LOADING, payload })

