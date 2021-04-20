import React, { useCallback, useMemo, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { TEXT_COVER_CHATS, BOTS } from '../../utils/constants'
import { useParams } from "react-router-dom";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ChatList } from './chat-list';
import { selectChats, selectBlinkingChatIds } from './selectors'
import { MessageField } from '../MessageField';
import { addChatAction, removeChatAction } from './actions';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
   root: {
      flex: 1,
      alignItems: "stretch",
      textShadow: "12px 8px 8px #1f2d38",
      backgroundColor: theme.palette.primary.background
   },
   text: {
      margin: "28% auto"
   },
   wrapperChats: {
      paddingLeft: theme.spacing(1),
      '@media (max-width: 780px)': {
         display: "none"
      },
   },
   button: {
      maxWidth: "22%",
      '@media (min-width: 780px)': {
         display: "none"
      },
   },
   chatsListMobile: {
      position: "absolute",
      zIndex: 1,
      top: "102px",
      left: "6px",
      backgroundColor: theme.palette.primary.background,
      boxShadow: "20px 20px 20px #1f2d38",
   }
}));

export const ChatsPage = () => {
   const classes = useStyles();

   const [chatsOpen, setChatsOpen] = useState(false)

   const handleChatsOpen = () => {
      setChatsOpen(!chatsOpen)
   }

   const dispatch = useDispatch()
   const chats = useSelector(selectChats);
   const blinkingChatIds = useSelector(selectBlinkingChatIds);

   const { chatId } = useParams()

   const chat = useMemo(
      () => chats?.find(chat => chat.id === chatId),
      [chats, chatId]
   );
   const botsFiltered = useMemo(
      () => BOTS.filter((bot) => !chats.find((chat) => bot.id === chat.id)),
      [chats])

   const addChat = useCallback((newChat) => {
      dispatch(addChatAction(newChat))
   }, [dispatch])

   const removeChat = useCallback((currentId) => {
      dispatch(removeChatAction(currentId))
   }, [dispatch])

   return (
      <>
         <IconButton
            className={classes.button}
            color="primary"
            aria-label="open drawer"
            onClick={handleChatsOpen}
            edge="start"
         >
            {chatsOpen
               ? <CancelIcon color="primary" fontSize="large" />
               : <MenuIcon color="secondary" fontSize="large" />
            }
         </IconButton>
         {chatsOpen &&
            <div className={classes.chatsListMobile} >
               <ChatList
                  chats={chats}
                  onAdd={addChat}
                  onRemove={removeChat}
                  blinkingChatIds={blinkingChatIds}
                  botsFiltered={botsFiltered}
               />
            </div>
         }
         <Grid container className={classes.root}>
            <Grid
               className={classes.wrapperChats}
               item xs={12} sm={4}
            >
               <ChatList
                  chats={chats}
                  onAdd={addChat}
                  onRemove={removeChat}
                  blinkingChatIds={blinkingChatIds}
                  botsFiltered={botsFiltered}
               />
            </Grid>
            <Grid
               item
               container xs={12} sm={8}
            >
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