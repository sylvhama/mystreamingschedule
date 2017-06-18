import React from 'react';
import PropTypes from 'prop-types';
import Schedule from '../shared/Schedule';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class ScheduleList extends React.Component {

  render() {
    return (
      <Card>
        <CardHeader
          title="Your Schedule"
        />
        <CardText style={{paddingTop:'0'}}>
          <Schedule loading={this.props.loading}
                    schedules={this.props.schedules}
                    removeSchedule={this.props.removeSchedule}
          />
        </CardText>
      </Card>
    )
  };
}

ScheduleList.propTypes = {
  loading: PropTypes.bool.isRequired,
  schedules: PropTypes.array.isRequired,
  removeSchedule: PropTypes.func
}

export default ScheduleList;