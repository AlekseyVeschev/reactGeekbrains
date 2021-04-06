import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { selectEmail } from './selectors'



const useStyles = makeStyles((theme) => ({
   root: {
      margin: "auto",
      color: theme.palette.primary.text,
   },
}));

export const Profile = () => {
   const classes = useStyles();

   const email = useSelector(selectEmail)

   return (
      <div className={classes.root}>
         <h1>PROFILE</h1>
         <h2>{email}</h2>
      </div>
   )
}
