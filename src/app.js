import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './app.scss';

const App = () => {
   const [messages, setMessages] = useState([])
   const sendMessage = () => {
      setMessages((prevState) => [...prevState, "Нормально"])
   }
   return (
      <div className="app">
         <h1> Как дела?  {messages.toString()}</h1>
         <button className="app__button" onClick={sendMessage}>Отправить</button>
      </div>
   )
}

ReactDOM.render(<App />, document.getElementById('root'));