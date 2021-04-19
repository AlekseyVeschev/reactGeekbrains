import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Router } from './router'
import { Header } from './header';
import { selectIsAuth } from '../Auth/selectors';
import { getAuth } from '../Auth/actions';
import { getMessagesThunk } from '../MessageField/actions';

export const App = () => {

   const isAuth = useSelector(selectIsAuth)
   const dispatch = useDispatch()
   const history = useHistory()

   useEffect(() => {
      dispatch(getAuth(history))
   }, [history])
   useEffect(() => {
      dispatch(getMessagesThunk())
   }, [])
   return (
      <>
         <Header isAuth={isAuth} />
         <Router isAuth={isAuth} />
      </>
   )
}
