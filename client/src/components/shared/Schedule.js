import React from 'react';
import PropTypes from 'prop-types';

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
  }

  render() {
    const week = this.formatSchedules(this.props.schedules);
    return (
      <p>coming soon</p>
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
