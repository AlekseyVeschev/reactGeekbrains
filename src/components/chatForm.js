import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
   form: {
      padding: theme.spacing(1),
   },
}));

export const ChatForm = ({ addChat }) => {
   const classes = useStyles();

   const [value, setValue] = useState("")
   const handleValue = useCallback((e) => {
      setValue(e.target.value);
   }, [])
   const handleSubmit = useCallback((event) => {
      event.preventDefault();
      addChat(value);
      setValue("")
   }, [value])
   return (
      <form
         className={classes.form}
         onSubmit={handleSubmit}
      >
         <Grid container wrap="nowrap">
            <TextField
               color='secondary'
               autoFocus
               fullWidth
               label="Name the chat"
               required
               type="text"
               value={value}
               onChange={handleValue}
            />
            <IconButton
               color="secondary"
               type="submit"
            >
               <AddIcon />
            </IconButton>
         </Grid>
      </form>
   )
}