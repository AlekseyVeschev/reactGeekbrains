import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter as Router } from "react-router-dom";
import { App } from './components/App/app';
import './index.scss';
import { theme } from './utils/light_theme';
import { ThemeProvider } from '@material-ui/core/styles'

const Index = () => {
   return (
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <Router>
               <App />
            </Router>
         </ThemeProvider>
      </Provider>
   )
}

ReactDOM.render(<Index />, document.getElementById('root'));