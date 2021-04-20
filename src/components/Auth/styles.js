import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
   form: {
      maxWidth: "50%",
      margin: "64px auto",
      textAlign: "center",
   },
   field: {
      margin: theme.spacing(2),
   },
   button: {
      padding: theme.spacing(2),
      marginRight: theme.spacing(3),
      boxShadow: "1px 4px 16px #1f2d38",
   },
   link: {
      textDecoration: "none",
      color: theme.palette.primary.text,
   },
}));