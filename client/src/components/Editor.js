import React from 'react';
import PropTypes from 'prop-types';
import Program from './editor/Program'
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

  renderEditor() {
    return (
      <div>
        <Program displayMsg={this.props.displayMsg}
                 loading={this.state.loading} 
                 setLoading={this.setLoading} />        
      </div>
    )
  };

  render() {
    return(
      <Paper zDepth={1} className="paper">
        <h2>Schedule Editor</h2>
        {this.renderEditor()}
      </Paper>
    );
  };
}

Program.propTypes = {
  displayMsg: PropTypes.func.isRequired
}

export default Editor;