import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   title: {
      flexGrow: 1,
   },
}));

export const Header = () => {
   const classes = useStyles();

   return (
      <AppBar position="static">
         <Toolbar>
            <Typography
               className={classes.title}
               variant="h6"
               color="secondary"
            >
               Veschev
            </Typography>
            <Link to="/profile">
               <Avatar />
            </Link>
         </Toolbar>
      </AppBar>
   );
}