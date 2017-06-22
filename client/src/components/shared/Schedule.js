import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {formatTime} from '../../helpers';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

class Schedule extends React.Component {

  state = {
    editMode: false
  }

  formatSchedules(schedules) {
    const week = [];
    schedules.forEach((schedule) => {
      schedule.days.forEach((day) => {
        if(!week[day-1]) week[day-1] = [];
        week[day-1].push(schedule);
      });
    });
    week.forEach((day) => {
      day.sort((a, b) => {
        if(a.startHour < b.startHour) return -1;
        if(a.startHour > b.startHour) return 1;
        if(a.startMin < b.startMin) return -1;
        if(a.startMin > b.startMin) return 1;
        return 0;
      });
    });
    return week;
  }

  renderSecondaryText(schedule) {
    return (
      <span style={{whiteSpace:'normal'}}>
        <strong>From {formatTime(schedule.startHour, schedule.startMin)} to {formatTime(schedule.endHour, schedule.endMin)}</strong>
        <br />
        {schedule.program.description}
      </span>
    )
  }

  renderRightIcon = (schedule) => {
    if(!this.state.editMode) return;
    return (
      <IconButton disabled={this.props.loading}
                  onTouchTap={() => this.props.removeSchedule(schedule)}
      >
        <Clear />
      </IconButton>
    )
  }

  renderList(week, i) {
    if(!week[i]) return;
    return(
      week[i].map((schedule) => {
        return (
          <ListItem
            key={schedule._id}
            leftAvatar={<Avatar style={{margin: 8}} size={24} backgroundColor={schedule.program.color} />}
            primaryText={schedule.program.name}
            secondaryText={this.renderSecondaryText(schedule)}
            disabled={true}
            rightIconButton ={this.renderRightIcon(schedule)}
          />
        )
      })
    )
  }

  componentWillMount() {
    if(this.props.removeSchedule) this.setState({
      editMode: true
    });
  }

  render() {
    const week = this.formatSchedules(this.props.schedules);
    return (
      <div>
        {days.map((day, i) => {
          return (
            <div key={day}>
              <List>
                <Subheader>{day}</Subheader>
                { this.renderList(week, i) }
              </List>
              <Divider />
            </div>
          )
        })}
      </div>
    );
  }
}

Schedule.propTypes = {
  loading: PropTypes.bool,
  schedules: PropTypes.array.isRequired,
  removeSchedule: PropTypes.func
}

export default Schedule;
