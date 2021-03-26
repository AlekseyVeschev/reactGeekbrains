import React, { useState, useCallback } from 'react';
import { AUTHORS } from '../utils/constants';
import './message.scss'

export const Message = ({ addMessage }) => {

   const [value, setValue] = useState({})
   const handleValue = useCallback((e) => {
      setValue({
         text: e.target.value,
         author: AUTHORS.ME
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

