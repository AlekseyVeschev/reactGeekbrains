import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { App } from './components/app';
import './index.scss';
import { theme } from './utils/light_theme';
import { ThemeProvider } from '@material-ui/core/styles'

const Index = () => {
   return (
      <ThemeProvider theme={theme}>
         <Router>
            <App />
         </Router>
      </ThemeProvider>

   )
}

ReactDOM.render(<Index />, document.getElementById('root'));