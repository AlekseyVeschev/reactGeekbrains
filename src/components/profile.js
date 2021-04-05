import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
   root: {
      margin: "auto",
      color: theme.palette.primary.text,
   },
}));

export const Profile = () => {
   const classes = useStyles();

   return (
      <div className={classes.root}>
         <h1>PROFILE</h1>
      </div>
   )
}
