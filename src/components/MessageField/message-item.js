import React, { useCallback } from 'react';
import {
   Avatar, ListItem, ListItemAvatar,
   ListItemText, ListItemSecondaryAction, Typography
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   listItem: {
      color: theme.palette.primary.text,
      boxShadow: "1px 4px 16px #1f2d38",
      marginTop: theme.spacing(0.5),
      borderRadius: theme.spacing(0.5),
      flexWrap: "wrap",
   },
   listItemAuthor: {
      wordWrap: "break-word"
   }
}));

export const MessageItem = ({ id, author, avatar, date, text, onRemove }) => {

   const classes = useStyles();

   const handleRemove = useCallback(() => {
      onRemove(id)
   }, [onRemove, id])

   return (
      <ListItem className={classes.listItem}>
         <ListItemAvatar>
            <Avatar
               alt={author}
               src={avatar}
            />
         </ListItemAvatar>
         <ListItemText
            className={classes.listItemAuthor}
            primary={text}
            secondary={
               <React.Fragment>
                  <Typography
                     component="span"
                     variant="caption"
                     color="secondary"
                  >
                     {author}
                  </Typography>
                  {date}
               </React.Fragment>
            }
         />
         <ListItemSecondaryAction>
            <IconButton
               edge="end"
               aria-label="delete"
               onClick={handleRemove}
            >
               <DeleteIcon />
            </IconButton>
         </ListItemSecondaryAction>
      </ListItem >
   )
}