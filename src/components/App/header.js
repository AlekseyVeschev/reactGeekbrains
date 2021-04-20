import React, { useCallback } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '@material-ui/core';
import MoodIcon from '@material-ui/icons/Mood';
import Button from '@material-ui/core/Button';
import { signOut } from '../Auth/actions';
import { selectUserEmail } from '../Auth/selectors';


const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      justifyContent: "space-between",
   },
   link: {
      textDecoration: "none",
   },
   rightBlock: {
      display: "flex",
   },
   linkProfile: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      textDecoration: "none",
      marginRight: theme.spacing(4),
   },
   linkProfileAvatar: {
      width: theme.spacing(3),
      height: theme.spacing(3),
   },
   title: {
      flexGrow: 1,
      textDecoration: "none",
      textShadow: "16px 4px 16px #fff",
      color: theme.palette.secondary.main,
      "&:hover": {
         color: theme.palette.primary.text,
      }
   }
}));

export const Header = ({ isAuth }) => {
   const classes = useStyles();

   const userEmail = useSelector(selectUserEmail)
   const dispatch = useDispatch()

   const handlerSignOut = useCallback(() => {
      dispatch(signOut())
   }, [])

   return (
      <AppBar position="static"  >
         <Toolbar className={classes.root}>
            <Link to="/chat" className={classes.link}>
               <Typography
                  className={classes.title}
                  variant="caption"
                  color="secondary"
               >
                  {isAuth && userEmail}
               </Typography>
            </Link>
            {isAuth &&
               <div className={classes.rightBlock}>
                  <Link to="/profile" className={classes.linkProfile}>
                     <Avatar className={classes.linkProfileAvatar} >
                        <MoodIcon
                           color='primary'
                        />
                     </Avatar>
                     <Typography
                        component="h1"
                        variant="caption"
                        color="secondary"
                     >
                        profile
                     </Typography>
                  </Link>
                  <Button
                     variant="outlined"
                     size="small"
                     color="secondary"
                     onClick={handlerSignOut}
                  >
                     sign out
                  </Button>
               </div>
            }
         </Toolbar>
      </AppBar >
   );
}