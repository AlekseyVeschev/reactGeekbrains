import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Profile } from '../Profile';
import { ChatsPage } from '../ChatsPage';

export const Router = () => {
   return (
      <Switch>
         <Route path="/profile">
            <Profile />
         </Route>
         <Route path="/chat/:chatId?">
            <ChatsPage />
         </Route>
      </Switch>
   )
}