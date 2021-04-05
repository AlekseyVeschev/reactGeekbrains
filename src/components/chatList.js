import React from 'react';
import { List, Typography, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from "react-router-dom";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { ChatForm } from './chatForm'

const useStyles = makeStyles((theme) => ({
   root: {
      padding: theme.spacing(1),
   },
   wrapperLink: {
      boxShadow: "12px 8px 16px #1f2d38",
      marginTop: theme.spacing(0.5),
      "&:hover": {
         background: theme.palette.primary.main,
         transform: "scale(1.05)",
         transition: "1.0s"
      },
   },
   link: {
      textDecoration: "none",
      color: theme.palette.secondary.main,
      "&:hover": {
         color: theme.palette.primary.text,
      }
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
               <div
                  key={chats.id}
                  className={classes.wrapperLink}
               >
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
               </div>
            ))
            }
         </List >
         <ChatForm addChat={addChat} />
      </>
   )
}