import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import MoodIcon from '@material-ui/icons/Mood';
import { selectName } from '../Profile/selectors'


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
      textShadow: "16px 4px 16px #fff",
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

   const name = useSelector(selectName)

   return (
      <AppBar position="static">
         <Toolbar className={classes.root}>
            <Link to="/chat" className={classes.link}>
               <Typography
                  className={classes.title}
                  variant="h6"
                  color="secondary"
               >
                  Veschev {name}
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