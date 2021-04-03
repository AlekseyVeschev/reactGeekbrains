import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { ChatList } from './chatList';
import { MessageField } from './messageField';
import { AUTHORS, BOT_AVATAR, TEXT_COVER_CHATS } from '../utils/constants'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useParams } from "react-router-dom";

const chatsInit = [
   { id: "1", name: "Family" },
   { id: "2", name: "Job" },
   { id: "3", name: "Relaxation" }
]

const messagesInit = {
   "1": [
      { id: "1", text: "Hello", author: AUTHORS.BOT, avatar: BOT_AVATAR },
      { id: "2", text: "Hi", author: AUTHORS.ME },
      { id: "3", text: "Your question", author: AUTHORS.BOT, avatar: BOT_AVATAR }
   ],
   "2": [{ id: "1", text: "Hi", author: AUTHORS.ME },
   { id: "2", text: "Your question", author: AUTHORS.BOT, avatar: BOT_AVATAR }],
}

const useStyles = makeStyles((theme) => ({
   root: {
      flex: 1,
      alignItems: "stretch",
   },
   text: {
      margin: "80px auto"
   }
}));

export const ChatsPage = () => {
   const classes = useStyles();

   const [isLoading, setIsLoading] = useState(false)
   const [messages, setMessages] = useState(messagesInit)
   const [chats, setChats] = useState(chatsInit)

   const { chatId } = useParams()

   const chat = useMemo(
      () => chats?.find(chat => chat.id === chatId),
      [chats, chatId]
   );

   useEffect(() => {
      const lastMessage = messages[chatId]?.[messages[chatId]?.length - 1];
      let timeout;
      if (lastMessage?.author === AUTHORS.ME) {
         setIsLoading(true)
         timeout = setTimeout(() => {
            addMessage({
               id: messages[chatId].length + 1,
               text: "Your question",
               author: AUTHORS.BOT,
               avatar: BOT_AVATAR
            })
            setIsLoading(false)
         }, 1500)
      }
      return () => {
         clearTimeout(timeout);
      }
   }, [messages])

   const addChat = useCallback((newChat) => {
      setChats(prev => [
         ...prev,
         {
            id: String(prev.length + 1),
            name: newChat
         }
      ])
   }, [])

   const addMessage = useCallback((value) => {
      setMessages((prev) => ({
         ...prev,
         [chatId]: [
            ...prev[chatId] || [],
            {
               id: (prev[chatId]?.length || 0) + 1,
               ...value
            }
         ]
      }))
   }, [chatId])

   return (
      <>
         <Grid container className={classes.root}>
            <Grid item xs={4}>
               <ChatList
                  chats={chats}
                  addChat={addChat}
               />
            </Grid>
            <Grid item container xs={8}>
               {chat
                  ? <MessageField
                     isLoading={isLoading}
                     messages={messages[chat.id]}
                     addMessage={addMessage}
                     chatName={chat.name}
                  />
                  : <Typography
                     variant="h3"
                     color="secondary"
                     className={classes.text}
                  >
                     {TEXT_COVER_CHATS}
                  </Typography>}
            </Grid>
         </Grid>
      </>
   )
}