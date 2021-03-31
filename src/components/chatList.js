import React, { Fragment } from 'react';
import { List, Typography, ListItem, ListItemAvatar, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(1),
   },
}));

export const ChatList = ({ chats }) => {
   const classes = useStyles();

   return (
      <List
         dense={true}
         className={classes.root}
         subheader={
            <Typography variant="h5" color="secondary">
               Chats
            </Typography>
         }
      >
         {chats.map(chats => (
            <Fragment key={chats.id}>
               <ListItem>
                  <ListItemAvatar>
                     <SupervisorAccountIcon />
                  </ListItemAvatar>
                  <ListItemText >
                     {chats.name}
                  </ListItemText>
               </ListItem>
               <Divider variant="inset" />
            </Fragment>
         ))}
      </List>
   )
}