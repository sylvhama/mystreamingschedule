import React from 'react';
import PropTypes from 'prop-types';
import { MaterialPicker } from 'react-color';
import {labelWithCounter, fetchOptions} from '../../helpers';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';

const limit = 20,
      style = {
        label: {
          paddingBottom: '8px',
          display: 'block',
          color: 'rgb(153, 153, 153)',
          fontSize: '11px'
        }
      };

class Program extends React.Component {

  getCardTitle() {
    if(!this.props.editMode) return 'New Program';
    return `Edit Program ${this.props.name}`
  }

  getCardAction() {
    if(!this.props.editMode) return 'Add Program';
    return 'Update Program';
  }

  renderSecondAction() {
    if(!this.props.editMode) return
    return (
      <FlatButton 
        onTouchTap={() => this.props.uneditProgram()}
        disabled={this.props.loading}
        label="Cancel" />
    )
  }

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <Card>
          <CardHeader
            title={this.getCardTitle()}
          />
          <CardText style={{paddingTop:'0'}}>
            <TextField
              required
              hintText="Write the program name here"
              floatingLabelText={labelWithCounter(this.props.name.length, limit, 'Program name')}
              floatingLabelFixed={true}
              fullWidth={true}
              value={this.props.name}
              onChange={(e, newValue) => this.props.onChange(newValue, 'name', limit)}
            />
            <TextField
              hintText="Write the program description here"
              floatingLabelText={labelWithCounter(this.props.description.length, limit, 'Program description')}
              floatingLabelFixed={true}
              fullWidth={true}
              value={this.props.description}
              onChange={(e, newValue) => this.props.onChange(newValue, 'description', limit)}
            />
            <div style={{marginTop: '16px'}} 
                 className="material-picker-container">
              <label style={style.label}>Program background color</label>
              <MaterialPicker color={this.props.color}
                              className="material-picker"
                              onChangeComplete={this.props.colorChange}
              />
            </div>
            <Toggle
              style={{marginTop:'16px'}}
              label="Black text (default is white)"
              labelPosition="right"
              toggled={this.props.blackText}
              onToggle={this.props.onToggle}
            />
          </CardText>
          <CardActions>
            <FlatButton 
              disabled={this.props.loading}
              type="submit"
              primary={true}
              label={this.getCardAction()} />
            {this.renderSecondAction()}
          </CardActions>
        </Card>
      </form>
    );
  }
}

Program.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  blackText: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  uneditProgram: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  colorChange: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
}

export default Program;
