import dateFormat from 'dateformat'
import { AUTHORS, BOT_AVATAR } from '../../utils/constants';
import { setBlinkingChatId, removeBlinkingChatId } from '../ChatsPage/actions'
import { getBotResponse } from '../API';

export const GET_MESSAGE_ERROR = "MESSAGES::GET_MESSAGE_ERROR"
export const ADD_MESSAGE = "MESSAGES::ADD_MESSAGE"
export const REMOVE_MESSAGE = "MESSAGES::REMOVE_MESSAGE"
export const WAIT_BOT_RESPONSE = "MESSAGES::WAIT_BOT_RESPONSE"
export const RECEIVED_BOT_RESPONSE = "MESSAGES::RECEIVED_BOT_RESPONSE"

export const setMessageError = (payload) => ({ type: GET_MESSAGE_ERROR, payload })
export const addMessageAction = (payload) => ({ type: ADD_MESSAGE, payload })
export const removeMessageAction = (payload) => ({ type: REMOVE_MESSAGE, payload })
export const waitBotResponse = (payload) => ({ type: WAIT_BOT_RESPONSE, payload })
export const receivedBotResponse = (payload) => ({ type: RECEIVED_BOT_RESPONSE, payload })


export const addMessageThunk = (newMessage) => (dispatch) => {
   dispatch(addMessageAction(newMessage))
   dispatch(addMessageBot(newMessage.text, newMessage.chatId))
}

const addMessageBot = (newMessageText, chatId) => async (dispatch) => {
   try {
      dispatch(waitBotResponse(chatId))
      const data = await getBotResponse(newMessageText, chatId)
      const messageBot = {
         id: data["@conversation"],
         chatId,
         text: data.message,
         date: dateFormat(new Date()),
         author: AUTHORS.BOT,
         avatar: BOT_AVATAR
      }
      dispatch(addMessageAction(messageBot))
      dispatch(receivedBotResponse(chatId))
      dispatch(setBlinkingChatId(chatId))
      setTimeout(() => {
         dispatch(removeBlinkingChatId(chatId))
      }, 2000)
   } catch (error) {
      dispatch(setMessageError(error))
   } finally {
      dispatch(receivedBotResponse(chatId))
   }
}
