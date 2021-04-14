import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid, IconButton } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
   form: {
      padding: theme.spacing(1),
   },
}));

export const ChatForm = ({ onAdd, botsFiltered }) => {
   const classes = useStyles();

   const [value, setValue] = useState("")
   const handleValue = useCallback((e) => {
      setValue(e.target.value);
   }, [])
   const handleSubmit = useCallback((event) => {
      event.preventDefault();
      onAdd(value);
      setValue("")
   }, [value])
   return (
      <form
         className={classes.form}
         onSubmit={handleSubmit}
      >
         <Grid container wrap="nowrap">
            <TextField
               select
               color='secondary'
               autoFocus
               fullWidth
               label="Choose a new bot"
               required
               type="text"
               value={value}
               onChange={handleValue}
            >
               {botsFiltered &&
                  botsFiltered.map(bot => (
                     <MenuItem key={bot.id} value={bot}>
                        {bot.name}
                     </MenuItem>
                  ))}
            </TextField>
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