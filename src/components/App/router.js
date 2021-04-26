import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { Profile } from '../Profile';
import { ChatsPage } from '../ChatsPage';
import { SignUp } from '../Auth/sign-up';
import { SignIn } from '../Auth/sign-in';

export const Router = ({ isAuth }) => {
   return (
      <Switch>
         <Route path="/signin" component={SignIn} />
         <Route exact path="/signup" component={SignUp} />
         {isAuth && <Route path="/profile" component={Profile} />}
         {isAuth && <Route path="/chat/:chatId?" component={ChatsPage} />}
         <Redirect to={isAuth ? "/chat" : "/signin"} />
      </Switch>
   )
}