import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
   error: {
      position: "absolute",
      zIndex: 1,
      width: '50%',
      marginTop: '32px',
      left: "24%",
      top: "8%",
   }
}))
export function ErrorAlert(props) {
   const classes = useStyles();
   return <MuiAlert className={classes.error} elevation={6} variant="filled" {...props} />;
}