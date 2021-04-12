import React, { useState, useCallback } from 'react';
import { AUTHORS } from '../../utils/constants';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
   form: {
      padding: theme.spacing(1),
   },
}));

export const MessageForm = ({ onAdd, isDisabled }) => {
   const classes = useStyles();

   const [value, setValue] = useState("")
   const handleValue = useCallback((e) => {
      setValue(e.target.value);
   }, [])
   const handleSubmit = useCallback((event) => {
      event.preventDefault();
      onAdd({
         text: value,
         author: AUTHORS.ME
      });
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
               label="Your message"
               required
               type="text"
               value={value}
               onChange={handleValue}
               disabled={isDisabled}
            />
            <IconButton
               color="secondary"
               type="submit"
               disabled={isDisabled}
            >
               <SendIcon />
            </IconButton>
         </Grid>
      </form>
   )
}