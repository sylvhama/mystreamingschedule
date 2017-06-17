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
    startMin: false,
    startHour: false,
    endMin: false,
    endHour: false
  }

  selectChange = (e, key, payload) => this.setState({days: payload});

  timeChange = (time, key) => {
    const d = new Date(time),
          min = d.getMinutes(),
          hour = d.getHours();
    this.setState({
      [`${key}Min`]: min,
      [`${key}Hour`]: hour
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.days.length || !Number.isInteger(this.state.startMin) || !Number.isInteger(this.state.startHour) || !Number.isInteger(this.state.endMin) || !Number.isInteger(this.state.endHour)) return;
    const hourDiff = this.state.endHour - this.state.startHour,
          minDiff = this.state.endMin - this.state.startMin;
    let timeOk = true;
    if(hourDiff < 0) timeOk = false;
    else if(hourDiff === 0 && minDiff < 30) timeOk = false;
    if(this.state.endHour === 0 && this.state.endMin === 0 && Math.abs(minDiff) <= 30) timeOk = true;
    if(!timeOk) return this.props.displayMsg('Starting date can not be higher than ending time.');
    const schedule = {...this.state};
    this.props.addSchedule(schedule);
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
  displayMsg: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  uneditProgram: PropTypes.func.isRequired,
  addSchedule: PropTypes.func.isRequired,
}

export default ScheduleForm;
