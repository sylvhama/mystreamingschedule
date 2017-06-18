import React from 'react';
import PropTypes from 'prop-types';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {formatTime} from '../../helpers';

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
      <span>
        <strong>From {formatTime(schedule.startHour, schedule.startMin)} to {formatTime(schedule.endHour, schedule.endMin)}</strong>
        <br />
        {schedule.program.description}
      </span>
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
          />
        )
      })
    )
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
  loading: PropTypes.bool.isRequired,
  schedules: PropTypes.array.isRequired,
  editMode: PropTypes.bool,
  removeSchedule: PropTypes.func
}

export default Schedule;
