import React from 'react';
import { List, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChatListItem } from './chat-list-item'
import { ChatForm } from './chat-form'

const useStyles = makeStyles((theme) => ({
   list: {
      padding: theme.spacing(1),
   },
}));

export const ChatList = ({ chats, onAdd, onRemove, blinkingChatIds, botsFiltered }) => {
   const classes = useStyles();

   return (
      <>
         <Typography
            component="span"
            variant="h5"
            color="secondary"
         >
            Bots
         </Typography>
         <List
            dense={true}
            className={classes.list}
         >
            {chats.map(chat => {
               const isBlinking = blinkingChatIds.includes(chat.id)
               return <ChatListItem
                  isBlinking={isBlinking}
                  key={chat.id}
                  id={chat.id}
                  name={chat.name}
                  onRemove={onRemove}
               />
            })
            }
         </List >
         <ChatForm
            onAdd={onAdd}
            botsFiltered={botsFiltered}
         />
      </>
   )
}