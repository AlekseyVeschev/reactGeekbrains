import React from 'react';
import { Switch, Route } from "react-router-dom";
import { Profile } from './profile';
import { ChatsPage } from './chatsPage';

export const Router = () => {
   return (
      <Switch>
         <Route path="/profile">
            <Profile />
         </Route>
         <Route path="/chat/:chatId">
            <ChatsPage />
         </Route>
      </Switch>
   )
}