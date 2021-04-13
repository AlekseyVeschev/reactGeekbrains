import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router } from "react-router-dom";
import { App } from './components/App/app';
import './index.scss';
import { theme } from './utils/light_theme';
import { ThemeProvider } from '@material-ui/core/styles'
import "regenerator-runtime/runtime";


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