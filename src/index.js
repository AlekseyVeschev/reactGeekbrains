import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from "react-router-dom";
import { App } from './components/App/app';
import './index.scss';
import { theme } from './utils/light_theme';
import { ThemeProvider } from '@material-ui/core/styles';
import "regenerator-runtime/runtime";
import firebase from 'firebase/app';
import { firebaseConfig } from './fb-config'

window.addEventListener("load", async () => {
   if ("serviceWorker" in navigator) {
      try {
         await navigator.serviceWorker.register("/service-worker.js")
      } catch (error) {
         console.log("Service worker error", error)
      }
   }
})

firebase.initializeApp(firebaseConfig)

const Index = () => {
   return (
      <Provider store={store}>
         <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
               <Router>
                  <App />
               </Router>
            </ThemeProvider>
         </PersistGate>
      </Provider>
   )
}

ReactDOM.render(<Index />, document.getElementById('root'));