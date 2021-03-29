import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './app.scss';
import { MessageField } from './components/messageField';
import { AUTHORS } from './utils/constants'

const messagesInit = [
   { text: "Hello", author: AUTHORS.BOT },
   { text: "Hi", author: AUTHORS.ME },
   { text: "Your question", author: AUTHORS.BOT },
]

const App = () => {
   const [messages, setMessages] = useState(messagesInit)

   useEffect(() => {
      const lastMessage = messages[messages.length - 1];
      let timeout;
      if (lastMessage.author === AUTHORS.ME) {
         timeout = setTimeout(() => {
            addMessage({ text: "Your question", author: AUTHORS.BOT })
         }, 500)
      }
      return () => {
         clearTimeout(timeout);
      }
   }, [messages])

   const addMessage = useCallback((value) => {
      setMessages((prev => [...prev, value]))
   }, [])
   return (
      <div className="app">
         <MessageField
            messages={messages}
            addMessage={addMessage}
         />
      </div >
   )
}

ReactDOM.render(<App />, document.getElementById('root'));