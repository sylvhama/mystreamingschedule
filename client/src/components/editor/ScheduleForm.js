import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';

class ScheduleForm extends React.Component {

  render() {
    return (
      <Card>
        <CardHeader
          title="Schedule Form"
        />
        <CardText style={{paddingTop:'0'}}>
        </CardText>
      </Card>
    )
  };
}

ScheduleForm.propTypes = {
  loading: PropTypes.bool.isRequired
}

export default ScheduleForm;
