import React, { useCallback } from 'react';
import { NavLink } from "react-router-dom";
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const useStyles = makeStyles((theme) => ({
   wrapperLink: {
      boxShadow: "12px 8px 16px #1f2d38",
      marginTop: theme.spacing(0.5),
      wordWrap: "break-word",
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
   blinking: {
      background: "red",
   }
}));

export const ChatListItem = ({ id, name, onRemove, isBlinking }) => {
   const classes = useStyles();

   const handleRemove = useCallback(() => {
      onRemove(id)
   }, [id, onRemove])

   return (
      <div className={`${isBlinking ? classes.blinking : classes.wrapperLink}`} >
         <NavLink
            to={`/chat/${id}`}
            className={classes.link}
            activeStyle={{ color: "#fff" }}
         >
            <ListItem className={classes.item}>
               <ListItemAvatar>
                  <SupervisorAccountIcon />
               </ListItemAvatar>
               <ListItemText >
                  {name}
               </ListItemText>
               <ListItemSecondaryAction>
                  <IconButton
                     onClick={handleRemove}
                     edge="end"
                  >
                     <DeleteIcon fontSize="small" />
                  </IconButton>
               </ListItemSecondaryAction>
            </ListItem>
         </NavLink>
      </div >
   )
}