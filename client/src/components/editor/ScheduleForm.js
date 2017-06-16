import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import TimePicker from 'material-ui/TimePicker';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

class ScheduleForm extends React.Component {

  state = {
    program_id: '',
    days: [],
    start: 0,
    end: 0
  }

  selectChange = (e, key, payload) => this.setState({days: payload});

  timeChange = (time, key) => {
    this.setState({
      [key]: time
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.days.length || !this.state.start instanceof Date || !this.state.end instanceof Date) return;
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Card>
          <CardHeader
            title={`New Schedule for ${this.props.name}`}
          />
          <CardText style={{paddingTop:'0'}}>
            <SelectField
              floatingLabelText="Pick day(s)"
              fullWidth={true}
              value={this.state.days}
              multiple={true}
              onChange={this.selectChange}
            >
              <MenuItem value={1} primaryText="Monday" />
              <MenuItem value={2} primaryText="Tuesday" />
              <MenuItem value={3} primaryText="Wednesday" />
              <MenuItem value={4} primaryText="Thursday" />
              <MenuItem value={5} primaryText="Friday" />
              <MenuItem value={6} primaryText="Saturday" />
              <MenuItem value={7} primaryText="Sunday" />
            </SelectField>
            <TimePicker
              hintText="Start time"
              pedantic={true}
              fullWidth={true}
              onChange={(e, t) => this.timeChange(t, 'start')}
            />
            <TimePicker
              hintText="End time"
              pedantic={true}
              fullWidth={true}
              onChange={(e, t) => this.timeChange(t, 'end')}
            />
          </CardText>
          <CardActions>
            <FlatButton 
              disabled={this.props.loading}
              type="submit"
              primary={true}
              label="Add Schedule" />  
            <FlatButton 
              onTouchTap={() => this.props.uneditProgram()}
              disabled={this.props.loading}
              label="Cancel" />          
          </CardActions>
        </Card>
      </form>
    )
  };
}

ScheduleForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  uneditProgram: PropTypes.func.isRequired
}

export default ScheduleForm;
