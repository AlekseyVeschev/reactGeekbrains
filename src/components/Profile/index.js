import React from 'react';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { selectName } from './selectors'



const useStyles = makeStyles((theme) => ({
   root: {
      margin: "auto",
      color: theme.palette.primary.text,
   },
}));

export const Profile = () => {
   const classes = useStyles();

   const name = useSelector(selectName)

   return (
      <div className={classes.root}>
         <h1>PROFILE</h1>
         <h2>{name}</h2>
      </div>
   )
}
