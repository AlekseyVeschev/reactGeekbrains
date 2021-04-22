import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { useStyles } from "./styles";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { signIn } from './actions';
import { Loading } from '../../utils/loading';
import { selectError, selectIsLoading } from './selectors';
import { ErrorAlert } from '../../utils/error-alert';


export const SignIn = () => {
   const classes = useStyles();

   const dispatch = useDispatch()
   const isLoading = useSelector(selectIsLoading)
   const error = useSelector(selectError)

   const [email, setEmail] = useState("")
   const handleChangeEmail = useCallback((e) => {
      setEmail(e.target.value);
   }, [])

   const [password, setPassword] = useState("")
   const handleChangePassword = useCallback((e) => {
      setPassword(e.target.value);
   }, [])
   const handleSubmit = useCallback((event) => {
      event.preventDefault();
      dispatch(signIn({ email, password }))
      setEmail("")
      setPassword("")
   }, [email, password])
   return (
      <>
         {error &&
            <ErrorAlert severity="error">
               <Typography variant="h5">
                  This is an error auth!
               </Typography>
               {error}
            </ErrorAlert>
         }
         {isLoading && <Loading />}
         <form
            className={classes.form}
            onSubmit={handleSubmit}
         >
            <Typography
               variant="h3"
               color="secondary"
            >
               Sign in
            </Typography>
            <TextField
               variant="filled"
               color='secondary'
               className={classes.field}
               fullWidth
               label="Your email"
               required
               type="email"
               value={email}
               onChange={handleChangeEmail}
               disabled={isLoading}
            />
            <TextField
               variant="filled"
               className={classes.field}
               color='secondary'
               fullWidth
               label="Your password"
               required
               type="password"
               value={password}
               onChange={handleChangePassword}
               disabled={isLoading}
            />
            <Button
               className={classes.button}
               color="secondary"
               type="submit"
               size="large"
               disabled={isLoading}
            >
               Sign in
            </Button>
            <Link
               className={classes.link}
               to="/signup"
            >Sign up</Link>
         </form >
      </>
   )
}