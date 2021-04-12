export const ADD_CHAT = "CHATS::ADD_CHAT"
export const REMOVE_CHAT = "CHATS::REMOVE_CHAT"
export const SET_BLINKING_CHAT_ID = "CHATS::SET_ID_IS_BLINKING"
export const REMOVE_BLINKING_CHAT_ID = "CHATS::REMOVE_ID_IS_BLINKING"

export const addChatAction = (payload) => ({ type: ADD_CHAT, payload })
export const removeChatAction = (payload) => ({ type: REMOVE_CHAT, payload })
export const setBlinkingChatId = (payload) => ({ type: SET_BLINKING_CHAT_ID, payload })
export const removeBlinkingChatId = (payload) => ({ type: REMOVE_BLINKING_CHAT_ID, payload })

