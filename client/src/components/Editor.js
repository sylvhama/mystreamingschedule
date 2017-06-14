import React from 'react';
import PropTypes from 'prop-types';
import Program from './editor/Program';
import Schedule from './editor/Schedule';
import Paper from 'material-ui/Paper';

class Editor extends React.Component {

  state = {
    loading: false
  }

  setLoading = (loading) => {
    this.setState({
      loading
    });
  }

  render() {
    return (
      <Paper zDepth={1} className="paper">
        <h2>Schedule Editor</h2>
        <Program displayMsg={this.props.displayMsg}
                 setLoading={this.setLoading}
                 loading={this.state.loading} />
        <Schedule displayMsg={this.props.displayMsg}
                  setLoading={this.setLoading}
                  loading={this.state.loading} />
      </Paper>
    )
  }
}

Program.propTypes = {
  displayMsg: PropTypes.func.isRequired
}

export default Editor;