import React from 'react';
import { render } from 'react-dom';
import {deepPurple500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import App from './components/App';

import './index.css';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: deepPurple500,
  },
  appBar: {
    height: 56
  }
});

const Root = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>
);

render(
  <Root />,
  document.getElementById('root')
);
