import React from 'react';
import { Message } from './message';

export const MessageField = ({ messages, addMessage, authorMe }) => {

   return (
      <>
         {messages.map((message, i) =>
            <div key={i}>
               <span>{message.author}:</span>
               <h3>{message.text}</h3>
            </div>
         )}
         <Message
            addMessage={addMessage}
            authorMe={authorMe}
         />
      </>
   )
}

