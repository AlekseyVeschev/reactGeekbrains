import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from "react-redux";
import dateFormat from 'dateformat'
import { TEXT_COVER_MESSAGES } from '../../utils/constants';
import { Grid, LinearProgress, List, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MessageForm } from './message-form';
import { MessageItem } from './message-item';
import { ErrorAlert } from '../../utils/error-alert';
import { addMessageThunk, removeMessageThunk } from '../MessageField/actions';
import { selectMessages, selectBotResponseIds, selectError } from '../MessageField/selectors'

const useStyles = makeStyles((theme) => ({
   container: {
      flexDirection: "column",
   },
   containerItem: {
      overflow: "auto",
   },
   list: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(2),
      marginTop: theme.spacing(3),
   },
   listTitle: {
      position: "fixed",
      top: "68px",
      right: "32px",
      zIndex: 1
   },
   text: {
      margin: "32px auto"
   },
}));

export const MessageField = ({ chatName, chatId }) => {
   const classes = useStyles();

   const dispatch = useDispatch()

   const error = useSelector(selectError);
   const messages = useSelector(selectMessages);
   const botResponseIds = useSelector(selectBotResponseIds);

   const isBotResponse = useMemo(() => botResponseIds.includes(chatId), [chatId, botResponseIds])

   const addMessage = useCallback((value) => {
      const newMessage = {
         ...value,
         chatId,
         date: dateFormat(new Date())
      }
      dispatch(addMessageThunk(newMessage))
   }, [chatId, dispatch])

   const removeMessage = useCallback((messageId) => {
      dispatch(removeMessageThunk(messageId))
   }, [dispatch])

   return (
      <Grid
         className={classes.container}
         container
      >
         <Grid
            item
            xs
            className={classes.containerItem}
         >
            {error &&
               <ErrorAlert severity="error">
                  <Typography variant="h5">
                     This is an error message!
                  </Typography>
                  {error}
               </ErrorAlert>
            }
            <List
               className={classes.list}
               subheader={
                  <Typography
                     className={classes.listTitle}
                     variant="h4"
                     color="secondary"
                  >
                     {chatName}
                  </Typography>
               }
            >
               {messages[chatId]?.length
                  ? messages[chatId].map(message =>
                     <MessageItem
                        key={message.id}
                        id={message.id}
                        avatar={message.avatar}
                        author={message.author}
                        date={message.date}
                        text={message.text}
                        onRemove={removeMessage}
                     />
                  )
                  : <Typography
                     variant="h5"
                     color="secondary"
                     className={classes.text}
                  >
                     {TEXT_COVER_MESSAGES}
                  </Typography>
               }
               {isBotResponse && <LinearProgress />}
            </List>
         </Grid>
         <MessageForm
            isDisabled={isBotResponse}
            onAdd={addMessage}
         />
      </Grid >
   )
}