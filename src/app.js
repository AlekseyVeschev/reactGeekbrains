import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
   const [messages, setMessages] = useState([])
   const sendMessage = () => {
      setMessages((prevState) => [...prevState, "Нормально"])
   }
   return (
      <div>
         <h1> Как дела?  {messages.toString()}</h1>
         <button onClick={sendMessage}>Отправить</button>
      </div>
   )
}

ReactDOM.render(<App />, document.getElementById('root'));