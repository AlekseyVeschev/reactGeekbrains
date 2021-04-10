import dateFormat from 'dateformat'
import { AUTHORS, BOT_AVATAR } from '../../utils/constants';
import { selectMessages } from './selectors'
import { setBlinkingChatId, removeBlinkingChatId } from '../ChatsPage/actions'

export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE"
export const REMOVE_MESSAGE = "MESSAGES::REMOVE_MESSAGE"
export const WAIT_BOT_RESPONSE = "MESSAGES::WAIT_BOT_RESPONSE"
export const RECEIVED_BOT_RESPONSE = "MESSAGES::RECEIVED_BOT_RESPONSE"

export const addMessageAction = (payload) => ({ type: ADD_MESSAGE, payload })
export const removeMessageAction = (payload) => ({ type: REMOVE_MESSAGE, payload })
export const waitBotResponse = (payload) => ({ type: WAIT_BOT_RESPONSE, payload })
export const receivedBotResponse = (payload) => ({ type: RECEIVED_BOT_RESPONSE, payload })


export const addMessageThunk = (newMessage) => (dispatch) => {
   dispatch(addMessageAction(newMessage))
   dispatch(addMessageBot(newMessage.chatId))
}

const addMessageBot = (chatId) => (dispatch, getState) => {
   const messages = selectMessages(getState())[chatId]
   dispatch(waitBotResponse(chatId))
   setTimeout(() => {
      const messageBot = {
         id: messages.length + 1,
         chatId,
         text: "Your question",
         date: dateFormat(new Date()),
         author: AUTHORS.BOT,
         avatar: BOT_AVATAR
      }
      dispatch(addMessageAction(messageBot))
      dispatch(receivedBotResponse(chatId))

      dispatch(setBlinkingChatId(chatId))
      setTimeout(() => {
         dispatch(removeBlinkingChatId(chatId))
      }, 10000)
   }, 30000)
}
