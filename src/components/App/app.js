import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Router } from './router'
import { Header } from './header';
import { selectIsAuth, selectIsLoading } from '../Auth/selectors';
import { getAuth } from '../Auth/actions';
import { getMessagesThunk } from '../MessageField/actions';
import { Loading } from '../../utils/loading';

export const App = () => {

   const isAuth = useSelector(selectIsAuth)
   const isLoading = useSelector(selectIsLoading)
   const dispatch = useDispatch()
   const history = useHistory()

   useEffect(() => {
      dispatch(getAuth(history))
   }, [history])
   useEffect(() => {
      dispatch(getMessagesThunk())
   }, [])
   return (
      isLoading
         ? <Loading />
         : <>
            <Header isAuth={isAuth} />
            <Router isAuth={isAuth} />
         </>
   )
}
