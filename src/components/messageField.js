import React, { Fragment } from 'react';
import { Avatar, Divider, Grid, LinearProgress, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { Message } from './message';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   container: {
      flex: 1,
      flexDirection: "column"
   },
   containerItem: {
      overflow: "auto"
   },
   list: {
      padding: theme.spacing(1),
   },
}));
export const MessageField = ({ messages, addMessage, isLoading, chatName }) => {
   const classes = useStyles();
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
                  <Typography variant="h4" color="secondary">
                     {chatName}
                  </Typography>
               }
            >
               {messages?.map(message =>
                  <Fragment key={message.id} >
                     <ListItem>
                        <ListItemAvatar>
                           <Avatar
                              alt={message.author}
                              src={message.avatar}
                           />
                        </ListItemAvatar>
                        <ListItemText>{message.author}  </ListItemText>
                        <ListItemText >{message.text}</ListItemText>
                     </ListItem>
                     <Divider />
                  </Fragment>
               )}
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