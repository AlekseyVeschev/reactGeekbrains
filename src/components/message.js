import React, { useState, useCallback } from 'react';
import './message.scss'
export const Message = ({ addMessage, authorMe }) => {

   const [value, setValue] = useState({})
   const handleValue = useCallback((e) => {
      setValue({
         text: e.target.value,
         author: authorMe
      });
   }, [])
   const handleSubmit = useCallback((event) => {
      event.preventDefault();
      addMessage(value);
   }, [value])
   return (
      <form className="form" onSubmit={handleSubmit}>
         <input
            required
            type="text"
            onChange={handleValue}
         />
         <button
            className="form__button"
            type="submit"
         >
            Отправить
         </button>
      </form>
   )
}

