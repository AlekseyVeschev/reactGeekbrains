import React, { useEffect, useCallback, Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import dateFormat from 'dateformat'
import { AUTHORS, BOT_AVATAR, TEXT_COVER_MESSAGES } from '../../utils/constants';
import { Avatar, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Message } from './message';
import { addMessageAction, setMessageLoading } from '../MessageField/actions';
import { selectMessages, selectIsLoading } from '../MessageField/selectors'

const useStyles = makeStyles((theme) => ({
   container: {
      flexDirection: "column"
   },
   containerItem: {
      overflow: "auto"
   },
   list: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(1),
   },
   listItem: {
      color: theme.palette.primary.text,
      boxShadow: "1px 4px 16px #1f2d38",
      marginTop: theme.spacing(0.5),
   },
   listText: {
      flex: "4",
   },
   text: {
      margin: "32px auto"
   }
}));

export const MessageField = ({ chatName, chatId }) => {
   const classes = useStyles();

   const dispatch = useDispatch()

   const messages = useSelector(selectMessages);
   const isLoading = useSelector(selectIsLoading);

   useEffect(() => {
      const lastMessage = messages[chatId]?.[messages[chatId]?.length - 1];
      let timeout;
      if (lastMessage?.author === AUTHORS.ME) {
         dispatch(setMessageLoading(true))
         timeout = setTimeout(() => {
            addMessage({
               id: messages[chatId].length + 1,
               text: "Your question",
               author: AUTHORS.BOT,
               avatar: BOT_AVATAR
            })
            dispatch(setMessageLoading(false))
         }, 1500)
      }
      return () => {
         clearTimeout(timeout);
      }
   }, [messages, chatId, dispatch, addMessage])

   const addMessage = useCallback((value) => {
      const newMessage = {
         value,
         chatId,
         date: dateFormat(new Date())
      }
      dispatch(addMessageAction(newMessage))
   }, [chatId, dispatch])

   return (
      <Grid
         className={classes.container}
         container
      >
         <Grid
            item xs
            className={classes.containerItem}
         >
            <List
               className={classes.list}
               subheader={
                  <Typography
                     variant="h4"
                     color="secondary"
                  >
                     {chatName}
                  </Typography>
               }
            >
               {messages[chatId]
                  ? messages[chatId].map(message =>
                     <Fragment key={message.id} >
                        <ListItem className={classes.listItem}  >
                           <ListItemAvatar>
                              <Avatar
                                 alt={message.author}
                                 src={message.avatar}
                              />
                           </ListItemAvatar>
                           <ListItemText
                              primary={message.author}
                              secondary={message.date}
                           />
                           <ListItemText className={classes.listText}>
                              {message.text}
                           </ListItemText>
                        </ListItem>
                     </Fragment>
                  )
                  : <Typography
                     variant="h5"
                     color="secondary"
                     className={classes.text}
                  >
                     {TEXT_COVER_MESSAGES}
                  </Typography>
               }
               {isLoading && <LinearProgress />}
            </List>
         </Grid>
         <Message
            isLoading={isLoading}
            addMessage={addMessage}
         />
      </Grid>
   )
}