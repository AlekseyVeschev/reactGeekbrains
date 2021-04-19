import dateFormat from 'dateformat';
import { AUTHORS, BOT_AVATAR } from '../../utils/constants';
import { setBlinkingChatId, removeBlinkingChatId } from '../ChatsPage/actions';
import { getBotResponse } from '../API';
import firebase from 'firebase/app';
import 'firebase/database';

export const SET_MESSAGES = "MESSAGES::SET_MESSAGES"
export const REMOVE_MESSAGE = "MESSAGES::REMOVE_MESSAGE"
export const GET_MESSAGE_ERROR = "MESSAGES::GET_MESSAGE_ERROR"
export const WAIT_BOT_RESPONSE = "MESSAGES::WAIT_BOT_RESPONSE"
export const RECEIVED_BOT_RESPONSE = "MESSAGES::RECEIVED_BOT_RESPONSE"

export const setMessageError = (payload) => ({ type: GET_MESSAGE_ERROR, payload })
export const removeMessageAction = (payload) => ({ type: REMOVE_MESSAGE, payload })
export const waitBotResponse = (payload) => ({ type: WAIT_BOT_RESPONSE, payload })
export const receivedBotResponse = (payload) => ({ type: RECEIVED_BOT_RESPONSE, payload })
export const setMessages = (payload) => ({ type: SET_MESSAGES, payload })


export const getMessagesThunk = () => (dispatch) => {
   try {
      const db = firebase.database()
      const messages = db.ref('messages')
      messages.on('value', (data) => {
         const result = {}
         data.forEach(mes => {
            const keyMessage = mes.key
            const message = mes.val()
            const chatId = message.chatId
            if (!result[chatId]) {
               result[chatId] = []
            }
            result[chatId].push({ ...message, id: keyMessage })
         }
         )
         dispatch(setMessages(result))
      })
   } catch (error) {
      console.log(error)
   }
}
export const addMessageThunk = (newMessage) => async (dispatch) => {
   const db = firebase.database()
   const messages = db.ref('messages')
   await messages.push(newMessage)

   dispatch(addMessageBot(newMessage.text, newMessage.chatId))
}

const addMessageBot = (newMessageText, chatId) => async (dispatch) => {
   try {
      const db = firebase.database()
      const messages = db.ref('messages')

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
      await messages.push(messageBot)
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
export const removeMessageThunk = (id) => async (dispatch) => {
   try {
      const db = firebase.database()
      const message = db.ref(`messages/${id}`)
      await message.remove()
   } catch (error) {
      dispatch(setMessageError(error.message))
   }
}