import { createMuiTheme } from '@material-ui/core/styles';
import { primaryColor } from './constant';
const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'Capitalize',
      color: primaryColor,
      borderColor: primaryColor,
    },
  },
});
export default theme;
