import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import { Link } from "react-router-dom";
import MoodIcon from '@material-ui/icons/Mood';

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      justifyContent: "space-between"
   },
   link: {
      textDecoration: "none",
   },
   title: {
      flexGrow: 1,
      textDecoration: "none",
      color: theme.palette.secondary.main,
      "&:hover": {
         color: theme.palette.primary.text,
         fontSize: theme.spacing(3),
         transition: "1s"
      }
   },
}));

export const Header = () => {
   const classes = useStyles();

   return (
      <AppBar position="static">
         <Toolbar className={classes.root}>
            <Link to="/chat" className={classes.link}>
               <Typography
                  className={classes.title}
                  variant="h6"
                  color="secondary"
               >
                  Veschev
               </Typography>
            </Link>
            <Link to="/profile">
               <Avatar >
                  <MoodIcon
                     color='primary'
                     fontSize="large"
                  />
               </Avatar>
            </Link>
         </Toolbar>
      </AppBar>
   );
}