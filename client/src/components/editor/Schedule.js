import React from 'react';
import PropTypes from 'prop-types';
import ScheduleForm from './ScheduleForm';
import ScheduleList from './ScheduleList';
import {fetchOptions} from '../../helpers';

class Schedule extends React.Component {

  render() {
    return(
      <div>
        <ScheduleList loading={this.props.loading} /> 
        <br />
        <ScheduleForm loading={this.props.loading} /> 
      </div>
    );
  }
}

Schedule.propTypes = {
  loading: PropTypes.bool.isRequired,
  displayMsg: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
}

export default Schedule;