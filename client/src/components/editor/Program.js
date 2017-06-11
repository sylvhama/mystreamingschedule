import React from 'react';
import PropTypes from 'prop-types';
import { MaterialPicker } from 'react-color';
import {labelWithCounter, fetchOptions} from '../../helpers';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const limit = 20,
      initColor = '#3F51B5',
      style = {
        label: {
          paddingBottom: '8px',
          display: 'block',
          color: 'rgb(153, 153, 153)',
          fontSize: '11px'
        }
      };

class Program extends React.Component {
  state = {
    color: initColor,
    name: '',
    description: ''
  };

  colorChange = (color, event) => {
    this.setState({
      color: color.hex
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.setLoading(true);
    fetch(`/program/`, {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        color: this.state.color
      }),
      ...fetchOptions
    })
    .then((res) => res.json())
    .then((json) => {
      if(json.error) this.props.displayMsg(json.error, true, json);
      else {
        this.props.displayMsg('Your program has been created.');
        this.props.setLoading(false);
      }
    })
    .catch((err) => this.props.displayMsg('An error has occured', true, err));
  };

  onChange(newValue, key, limit = 0) {
    if(limit > 0 && newValue.length > limit) return;
    this.setState({
      [key]: newValue
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Card>
          <CardHeader
            title="Program"
          />
          <CardText style={{paddingTop:'0'}}>
            <TextField
              required
              hintText="Write the program name here"
              floatingLabelText={labelWithCounter(this.state.name.length, limit, 'Program name')}
              floatingLabelFixed={true}
              fullWidth={true}
              value={this.state.name}
              onChange={(e, newValue) => this.onChange(newValue, 'name', limit)}
            />
            <TextField
              hintText="Write the program description here"
              floatingLabelText={labelWithCounter(this.state.description.length, limit, 'Program description')}
              floatingLabelFixed={true}
              fullWidth={true}
              value={this.state.description}
              onChange={(e, newValue) => this.onChange(newValue, 'description', limit)}
            />
            <div style={{marginTop: '16px'}} 
                 className="material-picker-container">
              <label style={style.label}>Program background color</label>
              <MaterialPicker color={this.state.color}
                              className="material-picker"
                              onChangeComplete={this.colorChange}
              />
            </div>
          </CardText>
          <CardActions>
            <FlatButton 
              disabled={this.props.loading}
              type="submit"
              primary={true}
              label="Save Program" />
          </CardActions>
        </Card>
      </form>
    );
  }
}

Program.propTypes = {
  loading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  displayMsg: PropTypes.func.isRequired
}

export default Program;
