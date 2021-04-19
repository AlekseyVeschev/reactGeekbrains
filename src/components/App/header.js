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
      justifyContent: "space-between"
   },
   link: {
      textDecoration: "none",
   },
   rightBlock: {
      display: "flex",
      minWidth: "24%",
      justifyContent: "space-between",
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
      <AppBar position="static">
         <Toolbar className={classes.root}>
            <Link to="/chat" className={classes.link}>
               <Typography
                  className={classes.title}
                  variant="h6"
                  color="secondary"
               >
                  {isAuth && userEmail}
               </Typography>
            </Link>
            {isAuth &&
               <div className={classes.rightBlock}>
                  <Link to="/profile">
                     <Avatar >
                        <MoodIcon
                           color='primary'
                           fontSize="large"
                        />
                     </Avatar>
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
      </AppBar>
   );
}