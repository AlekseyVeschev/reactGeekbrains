import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
   root: {
      zIndex: "3",
      position: "absolute",
      left: "50%",
      top: "40%"
   },
}));
export const Loading = () => {
   const classes = useStyles();
   return (
      <div className={classes.root}>
         <CircularProgress />
      </div>
   )
}