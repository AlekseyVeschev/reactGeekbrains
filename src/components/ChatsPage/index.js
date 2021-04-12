import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { TEXT_COVER_CHATS } from '../../utils/constants'
import { useParams } from "react-router-dom";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ChatList } from './chat-list';
import { selectChats, selectBlinkingChatIds } from './selectors'
import { MessageField } from '../MessageField';
import { addChatAction, removeChatAction } from './actions';


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

   const dispatch = useDispatch()
   const chats = useSelector(selectChats);
   const blinkingChatIds = useSelector(selectBlinkingChatIds);

   const { chatId } = useParams()

   const chat = useMemo(
      () => chats?.find(chat => chat.id === chatId),
      [chats, chatId]
   );

   const addChat = useCallback((newChat) => {
      dispatch(addChatAction(newChat))
   }, [dispatch])

   const removeChat = useCallback((currentId) => {
      dispatch(removeChatAction(currentId))
   }, [dispatch])

   return (
      <>
         <Grid container className={classes.root}>
            <Grid item xs={4}>
               <ChatList
                  chats={chats}
                  onAdd={addChat}
                  onRemove={removeChat}
                  blinkingChatIds={blinkingChatIds}
               />
            </Grid>
            <Grid item container xs={8}>
               {chat
                  ? <MessageField
                     chatName={chat.name}
                     chatId={chat.id}
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
