import { blue } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
   palette: {
      primary: {
         background: '#6a747c',
         main: '#1f2d38',
         text: '#fff'
      },
      secondary: {
         main: blue[100],
      },
   },
});
