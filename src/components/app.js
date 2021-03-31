import React, { useState, useEffect, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import { ChatList } from './chatList';
import { Header } from './header';
import { MessageField } from './messageField';
import { AUTHORS, BOT_AVATAR } from '../utils/constants'
import { makeStyles } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';

const chats = [
   { id: "1", name: "Family", icon: "" },
   { id: "2", name: "Job", icon: "" },
   { id: "3", name: "Relaxation", icon: "" }
]
const messagesInit = [
   { id: "1", text: "Hello", author: AUTHORS.BOT, avatar: BOT_AVATAR },
   { id: "2", text: "Hi", author: AUTHORS.ME },
   { id: "3", text: "Your question", author: AUTHORS.BOT, avatar: BOT_AVATAR },
];

const useStyles = makeStyles((theme) => ({
   root: {
      flex: 1,
      alignItems: "stretch",
   },
}));

export const App = () => {
   const classes = useStyles();

   const [isLoading, setIsLoading] = useState(false)
   const [messages, setMessages] = useState(messagesInit)

   useEffect(() => {
      const lastMessage = messages[messages.length - 1];
      let timeout;
      if (lastMessage.author === AUTHORS.ME) {
         setIsLoading(true)
         timeout = setTimeout(() => {
            addMessage({
               id: messages.length + 1,
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

   const addMessage = useCallback((value) => {
      setMessages((prev => [...prev, value]))
   }, [])
   return (
      <>
         <Header />
         <Grid container className={classes.root}>
            <Grid item xs={4}>
               <ChatList chats={chats} />
            </Grid>
            <Grid item container xs={8}>
               <MessageField
                  isLoading={isLoading}
                  messages={messages}
                  addMessage={addMessage}
               />
            </Grid>
         </Grid>
      </>
   )
}
