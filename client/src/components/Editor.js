import React from 'react';
import PropTypes from 'prop-types';
import Program from './editor/Program';
import Paper from 'material-ui/Paper';

class Editor extends React.Component {
  render() {
    return (
      <Paper zDepth={1} className="paper">
        <h2>Schedule Editor</h2>
        <Program displayMsg={this.props.displayMsg} />
      </Paper>
    )
  }
}

Program.propTypes = {
  displayMsg: PropTypes.func.isRequired
}

export default Editor;