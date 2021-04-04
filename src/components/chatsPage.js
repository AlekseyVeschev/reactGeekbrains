import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { ChatList } from './chatList';
import { MessageField } from './messageField';
import { AUTHORS, BOT_AVATAR, TEXT_COVER_CHATS } from '../utils/constants'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useParams } from "react-router-dom";
import dateFormat from "dateformat"

const chatsInit = [
   { id: "1", name: "Family" },
   { id: "2", name: "Job" },
   { id: "3", name: "Relaxation" }
]

const messagesInit = {
   "1": [
      { id: "1", text: "Hello", author: AUTHORS.BOT, avatar: BOT_AVATAR, date: "Sat Apr 04 2021 17:46:21" },
      { id: "2", text: "Hi", author: AUTHORS.ME, date: "Sat Apr 04 2021 17:46:21" },
      { id: "3", text: "Your question", author: AUTHORS.BOT, avatar: BOT_AVATAR, date: "Sat Apr 04 2021 17:46:21" }
   ],
   "2": [{ id: "1", text: "Hi", author: AUTHORS.ME, date: "Sat Apr 04 2021 17:46:21" },
   { id: "2", text: "Your question", author: AUTHORS.BOT, avatar: BOT_AVATAR, date: "Sat Apr 04 2021 17:46:21" }],
}

const useStyles = makeStyles((theme) => ({
   root: {
      flex: 1,
      alignItems: "stretch",
      textShadow: "12px 8px 8px #1f2d38",
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
               ...value,
               date: dateFormat(new Date())
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