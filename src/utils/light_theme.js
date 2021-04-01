import { blue, green, orange } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import { grid } from '@material-ui/system';

export const theme = createMuiTheme({
   palette: {
      primary: {
         main: '#1f2d38',
      },
      secondary: {
         main: blue[100],
      },
   },
});