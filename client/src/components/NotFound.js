import React from 'react';
import {Link} from 'react-router-dom';
import Paper from 'material-ui/Paper';

const NotFound = () => (
  <Paper zDepth={1} className="paper">
    <h2>404 - Page not found!</h2>
    <p><Link to="/">Head back to home</Link></p>
  </Paper>
);

export default NotFound;