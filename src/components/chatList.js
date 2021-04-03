import React, { Fragment } from 'react';
import { List, Typography, ListItem, ListItemAvatar, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { ChatForm } from './chatForm'

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(1),
   },
   link: {
      textDecoration: "none",
      color: theme.palette.secondary.main,
      "&:hover": {
         color: theme.palette.primary.text,
      },
   },
}));

export const ChatList = ({ chats, addChat }) => {
   const classes = useStyles();
   return (
      <>
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
                  <NavLink
                     to={`/chat/${chats.id}`}
                     className={classes.link}
                     activeStyle={{ color: "#fff" }}
                  >
                     <ListItem className={classes.item}>
                        <ListItemAvatar>
                           <SupervisorAccountIcon />
                        </ListItemAvatar>
                        <ListItemText >
                           {chats.name}
                        </ListItemText>
                     </ListItem>
                  </NavLink>
                  <Divider variant="inset" />
               </Fragment>
            ))
            }
         </List >
         <ChatForm addChat={addChat} />
      </>
   )
}