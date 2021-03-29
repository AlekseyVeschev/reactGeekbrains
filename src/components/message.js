import React, { useState, useCallback } from 'react';
import { AUTHORS } from '../utils/constants';
import './message.scss'

export const Message = ({ addMessage }) => {

   const [value, setValue] = useState("")
   const handleValue = useCallback((e) => {
      setValue(e.target.value);
   }, [])
   const handleSubmit = useCallback((event) => {
      event.preventDefault();
      addMessage({
         text: value,
         author: AUTHORS.ME
      });
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