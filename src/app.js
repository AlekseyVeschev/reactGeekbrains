import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './app.scss';
import { MessageField } from './components/messageField';
import { authors } from './utils/constants'

const messagesInit = [
   { text: "Hello", author: authors.bot },
   { text: "Hi", author: authors.me },
   { text: "Your question", author: authors.bot },
]

const App = () => {
   const authorMe = authors.me
   const [messages, setMessage] = useState(messagesInit)

   useEffect(() => {
      const authorLast = messages[messages.length - 1].author
      if (authorLast === authorMe) {
         setTimeout(() => {
            addMessage({ text: "Your question", author: authors.bot })
         }, 500)
      }
   }, [messages])

   const addMessage = useCallback((value) => {
      setMessage((prev => [...prev, value]))
   }, [])
   return (
      <div className="app">
         <MessageField
            messages={messages}
            addMessage={addMessage}
            authorMe={authorMe}
         />
      </div >
   )
}

ReactDOM.render(<App />, document.getElementById('root'));